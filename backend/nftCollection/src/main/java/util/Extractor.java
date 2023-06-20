package util;

import java.net.URI;
import java.net.URISyntaxException;

//.............................it will split the url and get the previous value from it.....................................

public class Extractor  {
//        String url = "https://api.simplehash.com/api/v0/nfts/collections/avalanche-fuji?cursor=MDAzMTZkZWIxZjQwNmM0MWQ0NjYwOTdjNDIxOGY4OTBfX3ByZXZpb3Vz&limit=50&order_direction=asc";
	public static String prevFromUrl(String url) {
        String cursorValue = null;

		try {
            URI uri = new URI(url);
            String query = uri.getQuery();
            String[] queryParams = query.split("&");


            for (String param : queryParams) {
                String[] keyValue = param.split("=");
                String key = keyValue[0];
                String value = keyValue[1];

                if (key.equals("cursor")) {
                    cursorValue = value;
                    break;
                }
            }

            System.out.println("Cursor value: " + cursorValue);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        
        return cursorValue;
        
	}
}
