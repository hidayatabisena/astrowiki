---
title: Swift Together AI
category: Gist Github
layout: ../../layouts/WikiLayout.astro
---

# Swift Together AI
---

tldr;
[Link to the gist](https://ai.moyahexagon.com/shares/4378dd41-8aac-43f3-9cf0-2dc938586495)

```swift
import UIKit
import Foundation

@MainActor
class TogetherAIRequest {
    private let apiKey = "YOUR_API_KEY"
    private let apiUrl = "https://api.together.xyz/v1/chat/completions"

    func sendRequest(prompt: String) async throws -> String {
        let requestBody: [String: Any] = [
            "model": "meta-llama/Llama-Vision-Free",
            "messages": [["role": "user", "content": prompt]],
            "stream": false
        ]

        guard let jsonData = try? JSONSerialization.data(withJSONObject: requestBody, options: []) else {
            throw NSError(domain: "SerializationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not serialize request body"])
        }

        var request = URLRequest(url: URL(string: apiUrl)!)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        request.httpBody = jsonData

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw NSError(domain: "HTTPError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])
        }

        guard httpResponse.statusCode == 200 else {
            throw NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])
        }

        // Parse the JSON response
        guard let jsonResponse = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
              let choices = jsonResponse["choices"] as? [[String: Any]],
              let firstChoice = choices.first,
              let message = firstChoice["message"] as? [String: Any],
              let content = message["content"] as? String else {
            throw NSError(domain: "JSONError", code: 1, userInfo: [NSLocalizedDescriptionKey: "JSON parsing failed"])
        }

        return content
    }
}

// Example usage
let togetherAIRequest = TogetherAIRequest()

let prompt = "List 20 fruits in alphabetical order "

Task {
    do {
        let content = try await togetherAIRequest.sendRequest(prompt: prompt)
        print("Content: \(content)")
    } catch {
        print("Error: \(error.localizedDescription)")
    }
}
```

# Code Explanation

This Swift code defines a class `TogetherAIRequest` that is used to send a request to a language model API provided by Together.xyz. The class is designed to interact with the API asynchronously, using Swift's async and await syntax. Here's a breakdown of the code:

## Class Definition

```swift
@MainActor
class TogetherAIRequest {
    private let apiKey = "YOUR_API_KEY"
    private let apiUrl = "https://api.together.xyz/v1/chat/completions"
```

- `@MainActor` ensures that the class methods are executed on the main thread, which is necessary for UI updates.

- `apiKey` is a private constant that holds the API key for authentication.

- `apiUrl` is the URL endpoint for the API.

## Method `sendRequest`

```swift
func sendRequest(prompt: String) async throws -> String {
    let requestBody: [String: Any] = [
        "model": "meta-llama/Llama-Vision-Free",
        "messages": [["role": "user", "content": prompt]],
        "stream": false
    ]
```

- `sendRequest` is an asynchronous method that takes a prompt as input and returns a String.

- `requestBody` is a dictionary that represents the JSON payload to be sent to the API. It includes:

   - `"model"`: Specifies the model to use.
   
   - `"messages"`: An array of messages, where each message has a "role" (e.g., "user") and "content" (the prompt).

   - `"stream"`: Set to false to receive the response as a single JSON object.

## JSON Serialization

```swift
   guard let jsonData = try? JSONSerialization.data(withJSONObject: requestBody, options: []) else {
    throw NSError(domain: "SerializationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not serialize request body"])
    }
```

- `JSONSerialization` is used to convert the `requestBody` dictionary into a JSON data object.

- The `requestBody` dictionary is serialized into JSON data. If serialization fails, an error is thrown.

## URL Request Configuration

```swift
    var request = URLRequest(url: URL(string: apiUrl)!)
    request.httpMethod = "POST"
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    request.addValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
    request.httpBody = jsonData
```

- A `URLRequest` object is created with the API URL.
- The HTTP method is set to `"POST"`.
- The `Content-Type` header is set to `"application/json"`.
- The `Authorization` header is set with the Bearer token using the API key.
- The serialized JSON data is set as the HTTP body of the request.

## Sending the Request

```swift
    let (data, response) = try await URLSession.shared.data(for: request)
```

- The request is sent asynchronously using `URLSession.shared.data(for:)`, which returns the response data and the response object.

## Response Validation

```swift
    guard let httpResponse = response as? HTTPURLResponse else {
        throw NSError(domain: "HTTPError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])
    }

    guard httpResponse.statusCode == 200 else {
        throw NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])
    }
```
- The response is checked to ensure it is an `HTTPURLResponse`.
- The status code is checked to ensure it is `200` (OK). If not, an error is thrown.

## JSON Parsing

```swift
    guard let jsonResponse = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
      let choices = jsonResponse["choices"] as? [[String: Any]],
      let firstChoice = choices.first,
      let message = firstChoice["message"] as? [String: Any],
      let content = message["content"] as? String else {
    throw NSError(domain: "JSONError", code: 1, userInfo: [NSLocalizedDescriptionKey: "JSON parsing failed"])
    }

    return content

```

- The response data is parsed from JSON into a dictionary.
- The code navigates through the JSON structure to extract the content of the first choice's message.
- If any step in the parsing fails, an error is thrown.
- The extracted content is returned as a String.

# Example Usage

```swift
let togetherAIRequest = TogetherAIRequest()

let prompt = "List 20 fruits in alphabetical order "

Task {
    do {
        let content = try await togetherAIRequest.sendRequest(prompt: prompt)
        print("Content: \(content)")
    } catch {
        print("Error: \(error.localizedDescription)")
    }
}
```

- An instance of TogetherAIRequest is created.
- A prompt is defined.
- An asynchronous task is created to send the request and handle the response.
- If the request is successful, the content is printed.
- If an error occurs, it is caught and its description is printed.


# Conclusion

This code is a Swift implementation for sending a request to a language model API, handling the response, and extracting the content of the response. It uses asynchronous programming to ensure that the network request does not block the main thread, which is crucial for maintaining a responsive user interface in iOS applications.