import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, TrendingUp, Award, Camera, Video, Sparkles } from "lucide-react"

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Carlos Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Premium Contractor",
      verified: true,
    },
    postType: "job_win",
    content: "Just completed a $12,500 commercial irrigation project! Thanks to IrrigGig AI for the perfect match. 🎉",
    earnings: 12500,
    images: ["/irrigation-commercial.jpg"],
    likes: 342,
    comments: 28,
    shares: 45,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Pro",
      verified: false,
    },
    postType: "before_after",
    content: "Before and after on this residential backyard transformation. Smart drip system saving 40% water!",
    images: ["/yard-before.jpg", "/yard-after.jpg"],
    likes: 589,
    comments: 67,
    shares: 123,
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Flores Landscape Design LLC",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Enterprise",
      verified: true,
    },
    postType: "milestone",
    content: "Celebrating 1,000 successful jobs on IrrigGig AI! Thank you to our amazing contractor community. 🚀",
    images: ["/celebration-team.jpg"],
    likes: 1243,
    comments: 156,
    shares: 289,
    timeAgo: "1 day ago",
  },
]

export default function FeedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Gig Glory Feed</h1>
              <p className="text-muted-foreground">Share your wins and inspire the community</p>
            </div>
            <Badge className="text-sm px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Badge>
          </div>

          <Card className="p-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Share your latest job win, tips, or project photos..."
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Photo
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                  </div>
                  <Button size="sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {feedPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{post.user.name}</p>
                        {post.user.verified && <Award className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {post.user.badge}
                        </Badge>
                        <span>•</span>
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  {post.earnings && (
                    <Badge className="bg-green-500 text-white">+${post.earnings.toLocaleString()}</Badge>
                  )}
                </div>

                <p className="text-base leading-relaxed">{post.content}</p>

                {post.images && (
                  <div className={`grid ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
                    {post.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image || "/placeholder.svg"}
                        alt={`Post image ${idx + 1}`}
                        className="w-full rounded-lg object-cover h-64"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-5 h-5" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-5 h-5" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="w-5 h-5" />
                      {post.shares}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Share Streak Active!</h3>
              <p className="text-muted-foreground mb-4">
                Share 3 posts this week to earn 500 bonus credits and unlock Premium features for 7 days FREE
              </p>
              <Button size="lg">Claim Reward</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
