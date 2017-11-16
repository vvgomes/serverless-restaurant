package com.serverless;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import static java.util.Collections.singletonMap;

public class Handler implements RequestHandler<Map<String, Object>, APIGatewayProxyResponseEvent> {

	private static final Logger logger = LoggerFactory.getLogger(Handler.class);

	@Override
	public APIGatewayProxyResponseEvent handleRequest(final Map<String, Object> input, final Context context) {
		logger.info("received: {}", input);

		final Response responseBody = new Response("Hello World!", input);

		return new APIGatewayProxyResponseEvent()
      .withStatusCode(200)
      .withBody(responseBody.toString())
      .withHeaders(singletonMap("X-Powered-By", "serverless-cqrs"));
	}
}
