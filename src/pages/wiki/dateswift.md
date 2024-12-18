---
title: Swift Dates Leading Zero
category: Gist Github
layout: ../../layouts/WikiLayout.astro
---

# Swift Dates Leading Zero

```swift
import Foundation

let date = Date()
let dayFormatter = DateFormatter()
dayFormatter.timeZone = TimeZone.current
dayFormatter.locale = Locale.current
dayFormatter.dateFormat = "d"

let monthYearFormatter = DateFormatter()
monthYearFormatter.timeZone = TimeZone.current
monthYearFormatter.locale = Locale.current
monthYearFormatter.dateFormat = "MMMM' in the year of 'yyyy"

let dayString = dayFormatter.string(from: date)
let monthYearString = monthYearFormatter.string(from: date)

let formattedDate = "\(dayString) in the month of \(monthYearString)"

print(formattedDate)
```

This Swift code is used to format the current date into a specific string format.

## Current Date

```swift
let date = Date()
```

- The `Date()` function is used to get the current date and time.

## Formatters

```swift
let dayFormatter = DateFormatter()
dayFormatter.timeZone = TimeZone.current
dayFormatter.locale = Locale.current
dayFormatter.dateFormat = "d"

let monthYearFormatter = DateFormatter()
monthYearFormatter.timeZone = TimeZone.current
monthYearFormatter.locale = Locale.current
monthYearFormatter.dateFormat = "MMMM' in the year of 'yyyy"
```

- The `DateFormatter()` function is used to create formatters for different date and time formats.
- The `timeZone`, `locale`, and `dateFormat` properties are set for both formatters.

- Another DateFormatter instance is created for formatting the month and year.

- timeZone = TimeZone.current and locale = Locale.current are set similarly to ensure consistency.

- The dateFormat = "MMMM' in the year of 'yyyy" specifies the format:
MMMM represents the full month name (e.g., "January", "February").
' in the year of ' is a literal string that will appear in the formatted output.
yyyy represents the four-digit year (e.g., "2024").

## String Formatting

```swift
let dayString = dayFormatter.string(from: date)
let monthYearString = monthYearFormatter.string(from: date)

let formattedDate = "\(dayString) in the month of \(monthYearString)"
```

- The `string(from:)` method is used to format the date using the formatters.
- The formatted date is then concatenated to create the final string.

## Output

```swift
print(formattedDate)
``` 

- The formatted date is printed to the console using the `print()` function.

# Example Output

If the current date is December 18, 2024, the output will be:

`18 in the month of December in the year of 2024`

Fabulous.


# Conclusion

This code demonstrates how to use `DateFormatter` to format the current date into a custom string format. It separates the day of the month and the month/year into two different formats and then combines them into a single, readable string. This approach allows for flexible and localized date formatting, which can be particularly useful for applications that need to display dates in a user-friendly manner.



