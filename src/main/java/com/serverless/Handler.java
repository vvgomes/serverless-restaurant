package com.serverless;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import static java.util.Collections.singletonMap;

public class Handler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

	private static final Logger logger = LoggerFactory.getLogger(Handler.class);

	@Override
	public ApiGatewayResponse handleRequest(final Map<String, Object> input, final Context context) {
		logger.info("received: {}", input);

		final Response responseBody = new Response("Hello World!", input);
		return ApiGatewayResponse.builder()
				.setStatusCode(200)
				.setObjectBody(responseBody)
				.setHeaders(singletonMap("X-Powered-By", "serverless-cqrs"))
				.build();
	}
}
