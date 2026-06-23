import { Button } from "@/components/ui/button"
import { Menu, Phone, Search, User } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                NexTel
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/#plans" className="text-gray-700 hover:text-purple-600 transition-colors">
                Plans
              </Link>
              <Link href="/#features" className="text-gray-700 hover:text-purple-600 transition-colors">
                Features
              </Link>
              <Link href="/#services" className="text-gray-700 hover:text-purple-600 transition-colors">
                Services
              </Link>
              <Link href="/#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors">
                Testimonials
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>
            <Link href="/auth/signin">
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="hidden md:flex bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Dashboard
              </Button>
            </Link>
            <Link href="/auth/signup" className="md:hidden">
              <Button size="icon">
                Get Started
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
