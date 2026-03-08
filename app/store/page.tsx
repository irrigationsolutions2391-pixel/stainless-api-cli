import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star, Sparkles, Zap, Package, BookOpen, Wrench, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function StorePage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("store_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")

  const { data: featuredProducts } = await supabase
    .from("store_products")
    .select("*, store_categories(name)")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(6)

  const { data: allProducts } = await supabase
    .from("store_products")
    .select("*, store_categories(name)")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  const iconMap: Record<string, any> = {
    Cpu: Zap,
    Droplets: Package,
    Sprout: Sparkles,
    FileText: BookOpen,
    Wrench: Wrench,
    BookOpen: BookOpen,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Online Store
          </Badge>
          <h1 className="text-5xl font-bold mb-4">IrrigGig Store</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional irrigation equipment, smart controllers, digital plans, and tools curated for contractors and
            homeowners
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories?.map((category) => {
            const Icon = iconMap[category.icon || "Package"] || Package
            return (
              <Link key={category.id} href={`/store/category/${category.id}`}>
                <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-semibold">{category.name}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Featured Products */}
        {featuredProducts && featuredProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: any) => (
                <Link key={product.id} href={`/store/product/${product.id}`}>
                  <Card className="hover:shadow-2xl transition-all hover:scale-105 cursor-pointer h-full">
                    <div className="relative h-64 bg-muted">
                      <Image
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                          Save ${(product.compare_at_price - product.price).toFixed(2)}
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-2">
                        {product.store_categories?.name}
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">${product.price}</span>
                          {product.compare_at_price && product.compare_at_price > product.price && (
                            <span className="text-sm line-through text-muted-foreground ml-2">
                              ${product.compare_at_price}
                            </span>
                          )}
                        </div>
                        <Button size="sm">
                          View
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <h2 className="text-3xl font-bold mb-6">All Products</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories?.slice(0, 4).map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProducts?.map((product: any) => (
                  <Link key={product.id} href={`/store/product/${product.id}`}>
                    <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
                      <div className="relative h-48 bg-muted">
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">${product.price}</span>
                          {product.is_digital && (
                            <Badge variant="secondary" className="text-xs">
                              Digital
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl p-8 border-2 border-primary/20">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Buy from IrrigGig Store?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Star className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Contractor-Grade Quality</h4>
              <p className="text-sm text-muted-foreground">
                Professional equipment trusted by top irrigation contractors
              </p>
            </div>
            <div className="text-center">
              <Package className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Fast Shipping</h4>
              <p className="text-sm text-muted-foreground">
                Get your equipment quickly with expedited delivery options
              </p>
            </div>
            <div className="text-center">
              <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Wallet Integration</h4>
              <p className="text-sm text-muted-foreground">Use your IrrigGig wallet for instant checkout</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
