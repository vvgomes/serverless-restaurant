package com.serverless;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.util.Map;

import static org.apache.commons.lang3.builder.ToStringStyle.JSON_STYLE;

public class Response {

	private final String message;
	private final Map<String, Object> input;

	Response(final String message, final Map<String, Object> input) {
		this.message = message;
		this.input = input;
	}

  @Override
  public String toString() {
    return ReflectionToStringBuilder.toString(this, JSON_STYLE);
  }
}
