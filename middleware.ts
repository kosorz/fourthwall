import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export function middleware() {
  return NextResponse.next()
}
