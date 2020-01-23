package de.hsmainz.cs.semgis.wfs.triplestore;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;

import javax.xml.stream.XMLStreamException;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Literal;
import org.json.JSONObject;

import de.hsmainz.cs.semgis.wfs.resultformatter.ResultFormatter;


public abstract class TripleStoreConnector {

	public static String prefixCollection="";
	
	static {
		try {
			BufferedReader reader=new BufferedReader(new FileReader(new File("prefixes.txt")));
			String line;
			while((line=reader.readLine())!=null){
				prefixCollection+=line+System.lineSeparator();
			}
			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	protected static Map<String,Map<String,String>> featureTypes=new TreeMap<>();
	
	public static Map<String,String> getFeatureTypeInformation(String queryString,String queryurl,String featuretype,JSONObject workingobj){
		if(featureTypes.containsKey(featuretype)) {
			return featureTypes.get(featuretype);
		}
		Map<String,String> result=new TreeMap<>();
		System.out.println(prefixCollection+queryString);
		Query query = QueryFactory.create(prefixCollection+queryString);
		QueryExecution qexec = QueryExecutionFactory.sparqlService(queryurl, query+" LIMIT 1");
		ResultSet results = qexec.execSelect();
		QuerySolution solu=results.next();
		Iterator<String> varnames=solu.varNames();
		System.out.println(solu.get(featuretype.toLowerCase()));
		if(solu.get(featuretype.toLowerCase())!=null) {
			result=new TreeMap<>();
			queryString=queryString.replace("WHERE{","WHERE{ BIND( <"+solu.get(featuretype.toLowerCase())+"> AS ?"+featuretype.toLowerCase()+") ");
			System.out.println(prefixCollection+queryString);
			query = QueryFactory.create(prefixCollection+queryString);
			qexec = QueryExecutionFactory.sparqlService(queryurl, query);
			results = qexec.execSelect();

		}
		String rel="",val="";
		Integer attcount=0;
		while(results.hasNext()) {
			solu=results.next();
			varnames=solu.varNames();
			while(varnames.hasNext()) {
				String varname=varnames.next();
				if(varname.equals("rel")) {
					rel=solu.get(varname).toString();
				}else if(varname.equals("val")){
					val=solu.get(varname).toString();
				}else if(varname.contains("_geom")){
					result.put("http://www.opengis.net/ont/geosparql#asWKT",solu.getLiteral(varname).toString());
					//geomLiteral=solu.getLiteral(varname).toString();
				}else {
					try {
						Literal lit=solu.getLiteral(varname);
						result.put(varname, lit.getDatatypeURI());
					}catch(Exception e) {
						result.put(varname, solu.get(varname).toString());	
					}  
				}

			}
			if(!rel.isEmpty() && !val.isEmpty()) {
				result.put(rel, val);
				rel="";
				val="";
			}
			attcount++;
		}
		System.out.println(result);
		workingobj.put("attcount",attcount);
			return result;
	}

	
	public String CQLfilterStringToSPARQLQuery(String queryString,String filter) {
		StringBuilder builder=new StringBuilder();
		if(filter.contains("AND")) {
			for(String filterex:filter.split("AND")) {
				if(filterex.contains("BETWEEN")) {
					
				}else {
					if(filter.contains("=")) {
						
					}
				}
			}
		}else if(filter.contains("=")){
			builder.append(filter.substring(0,filter.indexOf('='))+" "+filter.substring(filter.indexOf('=')+1));
		}
		return "";
	}
	
	public static String executePropertyValueQuery(String queryurl,String output,String propertyValue,
			String startingElement,String featuretype,
			String resourceids,JSONObject workingobj,String filter,String count,String resultType) throws XMLStreamException {
		String queryString="";
		if(resultType.equalsIgnoreCase("hits")) {
			queryString=" SELECT DISTINCT (COUNT ?"+featuretype.toLowerCase()+" AS ?count) WHERE { ?"+featuretype.toLowerCase()+" ?abc ?def .} "+System.lineSeparator();
		}else {
			queryString+=" SELECT ?"+featuretype.toLowerCase()+" ?member WHERE{"+System.lineSeparator();
		}
		if(!resourceids.isEmpty() && !resourceids.contains(",")) {
			queryString=queryString.replace("WHERE{","WHERE{ BIND( <"+workingobj.getString("namespace")+resourceids+"> AS ?"+workingobj.getString("indvar")+") "+System.lineSeparator());
		}else if(!resourceids.isEmpty() && resourceids.contains(",")) {
			StringBuilder toreplace=new StringBuilder();
			toreplace.append("WHERE{ VALUES ?"+workingobj.getString("indvar")+"{ ");
			for(String uri:resourceids.split(",")) {
				toreplace.append("<"+workingobj.getString("namespace")+uri+"> "); 
			}
			toreplace.append("} "+System.lineSeparator());
			queryString=queryString.replace("WHERE{",toreplace.toString());	
		}
		queryString+="?"+workingobj.getString("indvar")+" <"+propertyValue+"> ?member ."+System.lineSeparator();
		queryString+="}"+System.lineSeparator();
		Integer limit=Integer.valueOf(count);
		if(limit>0)
			queryString+=" LIMIT "+limit;
		System.out.println(prefixCollection+queryString);
		System.out.println(resourceids);
		Query query = QueryFactory.create(prefixCollection+queryString);
		QueryExecution qexec = QueryExecutionFactory.sparqlService(queryurl, query);
		ResultFormatter resformat=ResultFormatter.getFormatter(output);
		if(resformat==null) {
			return null;
		}
		ResultSet results = qexec.execSelect();
		if(resultType.equalsIgnoreCase("hits")) {
			if(results.hasNext()) {
				return results.next().get("count").toString();
			}
		}
		String res=resformat.formatter(results,0,startingElement,featuretype,propertyValue,(workingobj.has("typeColumn")?workingobj.get("typeColumn").toString():""),true);
		qexec.close();
		if(resformat.lastQueriedElemCount==0) {
			return "";
		}
		return res;
	}
	
	
	public static String executeQuery(String queryString,String queryurl,String output,String count,String offset,String startingElement,String featuretype,String resourceids,JSONObject workingobj,String filter,String resultType) throws XMLStreamException {
		if(resultType.equalsIgnoreCase("hits")) {
			queryString=" SELECT DISTINCT (COUNT ?"+featuretype.toLowerCase()+" AS ?count) WHERE{ ?"+featuretype.toLowerCase()+" ?abc ?def .}"+System.lineSeparator();
		}else {
			queryString+=" SELECT ?"+featuretype.toLowerCase()+" ?member WHERE{"+System.lineSeparator();
		}
		if(!resourceids.isEmpty() && !resourceids.contains(",")) {
			queryString=queryString.replace("WHERE{","WHERE{ BIND( <"+workingobj.getString("namespace")+resourceids+"> AS ?"+workingobj.getString("indvar")+") ");
		}else if(!resourceids.isEmpty() && resourceids.contains(",")) {
			StringBuilder toreplace=new StringBuilder();
			toreplace.append("WHERE{ VALUES ?"+workingobj.getString("indvar")+"{ ");
			for(String uri:resourceids.split(",")) {
				toreplace.append("<"+workingobj.getString("namespace")+uri+"> "); 
			}
			toreplace.append("}");
			queryString=queryString.replace("WHERE{",toreplace.toString());	
		}
		Integer limit=Integer.valueOf(count);
		System.out.println("Count: "+count);
		if(limit>=1) {
			queryString+=" LIMIT "+count;
		}
		System.out.println(prefixCollection+queryString);
		System.out.println(resourceids);
		Query query = QueryFactory.create(prefixCollection+queryString);
		QueryExecution qexec = QueryExecutionFactory.sparqlService(queryurl, query);
		ResultFormatter resformat=ResultFormatter.getFormatter(output);
		if(resformat==null) {
			return null;
		}
		ResultSet results = qexec.execSelect();
		if(resultType.equalsIgnoreCase("hits")) {
			if(results.hasNext()) {
				return results.next().get("count").toString();
			}
		}
		String res=resformat.formatter(results,Integer.valueOf(offset),startingElement,featuretype,"",(workingobj.has("typeColumn")?workingobj.get("typeColumn").toString():""),false);
		qexec.close();
		if(resformat.lastQueriedElemCount==0) {
			return "";
		}
		return res;
	}

}

