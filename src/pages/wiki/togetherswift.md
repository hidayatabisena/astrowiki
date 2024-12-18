---
title: Swift Together AI
category: Gist Github
layout: ../../layouts/WikiLayout.astro
---

# Swift Together AI

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