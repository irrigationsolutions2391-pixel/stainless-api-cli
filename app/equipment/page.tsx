import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Truck, Wrench, Construction, Leaf, Droplets, Shield, Calendar, DollarSign, MapPin } from "lucide-react"

const categories = [
  { name: "Excavation Equipment", icon: Construction, count: 45 },
  { name: "Irrigation Tools", icon: Wrench, count: 67 },
  { name: "Heavy Machinery", icon: Truck, count: 23 },
  { name: "Landscape Tools", icon: Leaf, count: 89 },
  { name: "Water Equipment", icon: Droplets, count: 34 },
  { name: "Safety & Testing", icon: Shield, count: 28 },
]

const featuredEquipment = [
  {
    id: 1,
    name: "Ditch Witch RT45 Trencher",
    category: "Excavation Equipment",
    dailyRate: 350,
    weeklyRate: 1200,
    location: "Phoenix, AZ",
    image: "/trencher.jpg",
    owner: "Flores Landscape Design LLC",
    rating: 5.0,
    available: true,
  },
  {
    id: 2,
    name: "Kubota KX040-4 Mini Excavator",
    category: "Excavation Equipment",
    dailyRate: 425,
    weeklyRate: 1500,
    location: "Scottsdale, AZ",
    image: "/large-yellow-excavator.png",
    owner: "Arizona Irrigation Co",
    rating: 4.9,
    available: true,
  },
  {
    id: 3,
    name: "Professional Pipe Threading Set",
    category: "Irrigation Tools",
    dailyRate: 75,
    weeklyRate: 250,
    location: "Mesa, AZ",
    image: "/pipe-tools.jpg",
    owner: "Desert Irrigation Pros",
    rating: 4.8,
    available: true,
  },
  {
    id: 4,
    name: "Honda WT40XK4 Trash Pump",
    category: "Water Equipment",
    dailyRate: 125,
    weeklyRate: 400,
    location: "Tempe, AZ",
    image: "/water-pump-industrial.png",
    owner: "Pump Specialists LLC",
    rating: 5.0,
    available: true,
  },
]

export default function EquipmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Equipment Rental Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Rent professional irrigation and landscaping equipment from verified owners
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search equipment..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.name} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phoenix">Phoenix, AZ</SelectItem>
              <SelectItem value="scottsdale">Scottsdale, AZ</SelectItem>
              <SelectItem value="mesa">Mesa, AZ</SelectItem>
              <SelectItem value="tempe">Tempe, AZ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="hover:border-primary transition-all cursor-pointer hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <category.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <p className="font-semibold text-sm mb-1">{category.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {category.count} items
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEquipment.map((equipment) => (
              <Card key={equipment.id} className="hover:shadow-xl transition-all">
                <CardHeader className="p-0">
                  <img
                    src={equipment.image || "/placeholder.svg"}
                    alt={equipment.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {equipment.category}
                    </Badge>
                    <CardTitle className="text-lg">{equipment.name}</CardTitle>
                    <CardDescription className="text-sm">{equipment.owner}</CardDescription>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {equipment.location}
                  </div>

                  <div className="border-t pt-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Daily Rate</span>
                      <span className="font-bold text-primary">${equipment.dailyRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weekly Rate</span>
                      <span className="font-semibold">${equipment.weeklyRate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold">{equipment.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                    <Badge variant={equipment.available ? "default" : "secondary"} className="text-xs">
                      {equipment.available ? "Available" : "Booked"}
                    </Badge>
                  </div>

                  <Button className="w-full" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
          <div className="text-center max-w-2xl mx-auto">
            <Truck className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-3">List Your Equipment</h3>
            <p className="text-muted-foreground mb-6">
              Turn your idle equipment into passive income. Earn up to $10,000/month renting out heavy machinery and
              tools.
            </p>
            <Button size="lg">
              <DollarSign className="w-5 h-5 mr-2" />
              Start Earning
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
