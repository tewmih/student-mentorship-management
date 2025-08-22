"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  MessageCircle,
  Users,
  Target,
  Clock,
  TrendingUp,
  FileText,
  MessageSquare,
  Video,
  Star,
  Award,
} from "lucide-react"

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">EduMentor</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Mentor
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex! 👋</h2>
          <p className="text-muted-foreground text-lg">Let's continue your learning journey and achieve your goals.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Progress & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Academic Goals</span>
                      <span className="text-sm text-muted-foreground">6%</span>
                    </div>
                    <Progress value={6} className="h-2" />
                    <p className="text-xs text-muted-foreground">2 of 33 goals completed</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sessions Attended</span>
                      <span className="text-sm text-muted-foreground">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <p className="text-xs text-muted-foreground">18 of 25 sessions</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Skill Development</span>
                      <span className="text-sm text-muted-foreground">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-muted-foreground">7 of 10 skills mastered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Time Management Workshop</h4>
                      <p className="text-sm text-muted-foreground">Today at 2:00 PM</p>
                      <Badge variant="secondary" className="mt-1">
                        Group
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    Join
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">One-on-One Check-in</h4>
                      <p className="text-sm text-muted-foreground">Tomorrow at 4:00 PM</p>
                      <Badge variant="outline" className="mt-1">
                        Individual
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Study Group: Math</h4>
                      <p className="text-sm text-muted-foreground">Friday at 6:00 PM</p>
                      <Badge variant="secondary" className="mt-1">
                        Group
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Confirm
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* This Semester Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  This Semester
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary">18</div>
                    <div className="text-sm text-muted-foreground">Sessions Attended</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-accent">24</div>
                    <div className="text-sm text-muted-foreground">Hours of Mentoring</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-secondary">4/6</div>
                    <div className="text-sm text-muted-foreground">Goals Completed</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Peer Connections</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Mentor & Resources */}
          <div className="space-y-6">
            {/* My Mentor */}
            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  My Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/woman-mentor.png" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">3rd Year Computer Science</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs text-muted-foreground">4.9 rating</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="font-medium">Last Session:</span>
                    <p className="text-muted-foreground">"Study Strategies for Finals" • 3 days ago</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <FileText className="w-5 h-5 mr-3 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Study Materials</div>
                    <div className="text-sm text-muted-foreground">Notes, guides & resources</div>
                  </div>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <MessageSquare className="w-5 h-5 mr-3 text-accent" />
                  <div className="text-left">
                    <div className="font-medium">Group Chat</div>
                    <div className="text-sm text-muted-foreground">Connect with peers</div>
                  </div>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <Calendar className="w-5 h-5 mr-3 text-secondary" />
                  <div className="text-left">
                    <div className="font-medium">Schedule</div>
                    <div className="text-sm text-muted-foreground">View all sessions</div>
                  </div>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <Target className="w-5 h-5 mr-3 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Feedback</div>
                    <div className="text-sm text-muted-foreground">Track your progress</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
