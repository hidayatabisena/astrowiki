---
title: UI Color Extension
category: Gist Github
layout: ../../layouts/WikiLayout.astro
---

# Swift Color Extension

tldr;

[Link to the gist](https://ai.moyahexagon.com/shares/74d8a1a4-a1b1-4484-b48d-9c91ca9827c9)

```swift
import Foundation
import UIKit

extension UIColor {
    /// #CBFB5E
    static var brand1: UIColor = UIColor(rgb: 0xCBFB5E)
    /// #0E0B1F
    static var brand2: UIColor = UIColor(rgb: 0x0E0B1F)
    /// #EEEEEE
    static var neutral1: UIColor = UIColor(rgb: 0xEEEEEE)
    /// #7A7C81
    static var neutral2: UIColor = UIColor(rgb: 0x71737B)
    /// #20242F
    static var neutral3: UIColor = UIColor(rgb: 0x20242F)
    
    convenience init(red: Int, green: Int, blue: Int) {
        assert(red >= 0 && red <= 255, "Invalid red component")
        assert(green >= 0 && green <= 255, "Invalid green component")
        assert(blue >= 0 && blue <= 255, "Invalid blue component")
        self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: 1.0)
    }
    
    convenience init(rgb: Int) {
        self.init(
            red: (rgb >> 16) & 0xFF,
            green: (rgb >> 8) & 0xFF,
            blue: rgb & 0xFF
        )
    }
}
```

## Code Explanation

This Swift code extends the `UIColor` `class` from the `UIKit` framework to include custom color definitions and convenience initializers for creating UIColor instances from RGB values.

## Breakdown of the Code

1. Importing Foundation and UIKit:
`import Foundation`: This imports the Foundation framework, which provides essential data types, collections, and operating-system services to define the base layer of functionality for your app.

`import UIKit`: This imports the UIKit framework, which provides the essential infrastructure for your app, including windows, views, and view controllers.

2. Extending UIColor:
The code extends the UIColor `class` using the `extension` keyword. This allows you to add new functionality to an existing class without modifying its original implementation.

3. Static Color Definitions:
The extension defines several `static` properties of type UIColor:
brand1, brand2, neutral1, neutral2, and neutral3 are predefined colors with specific RGB values.

These colors are initialized using a custom initializer that takes an integer representing the RGB value in hexadecimal format.

4. Convenience Initializers:
`convenience init(red: Int, green: Int, blue: Int)`: This initializer allows you to create a UIColor instance by specifying the red, green, and blue components as integers ranging from 0 to 255.

It uses assertions to ensure that the provided RGB values are within the valid range.

It converts the integer values to CGFloat and divides by 255.0 to scale them to the range required by the UIColor initializer.

5. `convenience init(rgb: Int)`: This initializer allows you to create a UIColor instance by specifying a single integer representing the RGB value in hexadecimal format.

It extracts the red, green, and blue components from the integer using bitwise operations and then calls the previous initializer to create the `UIColor`instance.

# Example Usage

Here's an example of how you might use the extended UIColor class in a Swift application:

```swift
import UIKit

// Create a view and set its background color to brand1
let view = UIView(frame: CGRect(x: 0, y: 0, width: 200, height: 200))
view.backgroundColor = UIColor.brand1

// Create a label and set its text color to neutral2
let label = UILabel(frame: CGRect(x: 0, y: 0, width: 200, height: 50))
label.text = "Hello, World!"
label.textColor = UIColor.neutral2

// Create a button and set its background color using the RGB initializer
let button = UIButton(type: .system)
button.frame = CGRect(x: 0, y: 50, width: 100, height: 50)
button.setTitle("Click Me", for: .normal)
button.backgroundColor = UIColor(rgb: 0xFF5733) // Custom color

// Add the view, label, and button to a window or another view
// For example, if you have a window:
// window.addSubview(view)
// view.addSubview(label)
// view.addSubview(button)
```

In this example:

- A `UIView` is created and its background color is set to brand1.
- A `UILabel` is created, its text is set to "Hello, World!", and its text color is set to neutral2.
- A `UIButton` is created, its title is set to "Click Me", and its background color is set to a custom color using the rgb initializer.

This demonstrates how the extended UIColor class can be used to easily create and manage custom colors in a Swift application.