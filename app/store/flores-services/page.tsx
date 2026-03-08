import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplet, Wrench, Sparkles, CheckCircle, Star, Phone, Mail } from "lucide-react"

const services = [
  {
    id: 1,
    name: "PVC Irrigation System Upgrade",
    category: "Irrigation Install",
    description:
      "Professional PVC pipe system installation with optimal zone coverage. Perfect for residential and small commercial properties.",
    basePrice: 2500,
    features: [
      "Complete PVC piping network",
      "Smart zone controllers",
      "High-efficiency sprinkler heads",
      "Backflow prevention system",
      "5-year warranty",
    ],
    image: "/pvc-irrigation.jpg",
    duration: "3-5 days",
    rating: 5.0,
  },
  {
    id: 2,
    name: "Drip Irrigation System",
    category: "Drip Installation",
    description:
      "Water-efficient drip system installation for gardens, landscaping, and agricultural applications. Save up to 60% on water usage.",
    basePrice: 1800,
    features: [
      "Premium drip line installation",
      "Precision emitter placement",
      "Automated timer system",
      "Pressure regulation",
      "3-year warranty",
    ],
    image: "/drip-system.jpg",
    duration: "2-3 days",
    rating: 5.0,
  },
  {
    id: 3,
    name: "Sprinkler System Upgrade",
    category: "Sprinkler Upgrade",
    description:
      "Modernize your existing sprinkler system with smart controllers, efficient heads, and improved coverage patterns.",
    basePrice: 1200,
    features: [
      "Smart WiFi controller installation",
      "New high-efficiency heads",
      "System optimization",
      "Leak detection and repair",
      "2-year warranty",
    ],
    image: "/sprinkler-upgrade.jpg",
    duration: "1-2 days",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Commercial Irrigation Design",
    category: "Large Scale",
    description:
      "Complete irrigation design and installation for commercial properties, HOAs, and large residential estates.",
    basePrice: 8500,
    features: [
      "Professional CAD design",
      "Industrial-grade components",
      "Multi-zone smart control",
      "Maintenance plan included",
      "10-year warranty",
    ],
    image: "/commercial-irrigation.jpg",
    duration: "1-2 weeks",
    rating: 5.0,
    featured: true,
  },
]

export default function FloresServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="mb-12">
          <Badge className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Flores Landscape Design LLC
          </Badge>
          <h1 className="text-5xl font-bold mb-4">Professional Irrigation Services</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Industry-leading irrigation installation and upgrades by the founders of IrrigGig AI
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-semibold">Licensed & Insured</p>
                <p className="text-xs text-muted-foreground">Fully bonded professionals</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-semibold">5.0 Rating</p>
                <p className="text-xs text-muted-foreground">500+ completed projects</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10">
              <CardContent className="p-4 text-center">
                <Wrench className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="font-semibold">10 Years</p>
                <p className="text-xs text-muted-foreground">Industry experience</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10">
              <CardContent className="p-4 text-center">
                <Droplet className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="font-semibold">40% Savings</p>
                <p className="text-xs text-muted-foreground">Average water reduction</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`hover:shadow-xl transition-all ${service.featured ? "border-2 border-primary" : ""}`}
            >
              {service.featured && (
                <div className="bg-primary text-primary-foreground text-center py-2 font-semibold text-sm">
                  Flores Priority Service
                </div>
              )}
              <CardHeader className="p-0">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {service.category}
                  </Badge>
                  <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-b">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting at</p>
                    <p className="text-3xl font-bold text-primary">${service.basePrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{service.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{service.duration}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button className="w-full">Request Quote</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-2 border-primary/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Why Choose Flores Landscape Design LLC?</h2>
                <p className="text-muted-foreground mb-6">
                  As the founders of IrrigGig AI, we set the standard for professional irrigation services. Our team
                  combines decades of experience with cutting-edge technology to deliver exceptional results.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Free consultation and detailed estimates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Industry-leading warranties on all work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Priority scheduling for large projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Maintenance plans available</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Contact Flores Landscape Design</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>irrigationsolutions2391@gmail.com</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6" size="lg">
                      Schedule Free Consultation
                    </Button>
                  </CardContent>
                </Card>
                <p className="text-xs text-center text-muted-foreground">
                  Owner: Hugo Vazquez "The Phoenix" | Serving Arizona since 2015
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
