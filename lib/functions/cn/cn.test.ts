import { cn } from "./cn"

describe("cn function", () => {
  test("merges Tailwind classes correctly", () => {
    const result = cn("bg-red-500", "text-white", "bg-blue-500")
    expect(result).toBe("text-white bg-blue-500")
  })

  test("handles conditional classes correctly", () => {
    const result = cn("p-4", false && "hidden", "text-center", null, undefined, "bg-green-500")
    expect(result).toBe("p-4 text-center bg-green-500")
  })

  test("removes duplicate classes", () => {
    const result = cn("font-bold", "font-bold", "text-lg", "text-lg")
    expect(result).toBe("font-bold text-lg")
  })

  test("handles empty inputs gracefully", () => {
    const result = cn()
    expect(result).toBe("")
  })

  test("handles mixed valid and invalid inputs", () => {
    const result = cn("p-2", null, "m-4", undefined, "hover:bg-gray-200")
    expect(result).toBe("p-2 m-4 hover:bg-gray-200")
  })
})
