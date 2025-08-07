import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Download,
  Briefcase, 
  Rocket, 
  TrendingUp,
  Lightbulb,
  Users,
  BarChart3,
  Settings,
  Handshake,
  MessageSquare,
  Menu,
  X,
  AlertTriangle,
  CheckCircle,
  Zap
} from "lucide-react";
import profImagePath from "@assets/20250725_174731_1754561854223.jpg";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleDownloadResume = () => {
    window.open('/api/resume/download', '_blank');
  };

  // Smooth scroll and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-foreground">Jit Goria</div>
            
            <div className="hidden md:flex space-x-8">
              {['about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            
            <button 
              className="md:hidden text-muted-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {['about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-left transition-colors ${
                      activeSection === section 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-20 pb-16 gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Product Leader &<br />Systems Thinker
                </h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-white/20 text-white border-white/30 text-sm">Bridge Builder</Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm">AI/ML Pioneer</Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm">Scale Architect</Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm">Impact Driver</Badge>
                </div>
                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  I believe exceptional products emerge from the intersection of <span className="font-semibold text-yellow-200">human empathy</span>, <span className="font-semibold text-blue-200">technical possibility</span>, and <span className="font-semibold text-green-200">business strategy</span>. My mission: transforming complex challenges into elegant solutions that people actually want to use.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-white text-primary hover:bg-slate-50 px-8 py-3 rounded-full font-semibold"
                  >
                    Get In Touch
                  </Button>
                  <Button 
                    onClick={handleDownloadResume}
                    variant="outline"
                    className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary px-8 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img 
                  src={profImagePath} 
                  alt="Jit Goria professional headshot" 
                  className="rounded-2xl shadow-2xl w-80 h-80 object-cover border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Philosophy */}
      <section id="experience" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">My Product Philosophy</h2>
              <p className="text-xl text-muted-foreground">How I approach complex challenges and create products people love</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="card-hover text-center p-8">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Human-First Design</h3>
                <p className="text-muted-foreground">
                  Every feature starts with understanding real user pain. I spend time with actual users, not just personas. Technology should feel invisible, not impressive.
                </p>
              </Card>
              
              <Card className="card-hover text-center p-8">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Systems Thinking</h3>
                <p className="text-muted-foreground">
                  Products exist within complex ecosystems. I map dependencies, anticipate ripple effects, and design for resilience at scale.
                </p>
              </Card>
              
              <Card className="card-hover text-center p-8">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Data-Driven Intuition</h3>
                <p className="text-muted-foreground">
                  Numbers tell stories, but context gives them meaning. I combine quantitative insights with qualitative understanding to make confident decisions.
                </p>
              </Card>
            </div>
            
            {/* Problem-Solving Approach */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-2xl mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">How I Solve Complex Product Challenges</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Deep Dive</h4>
                  <p className="text-sm text-muted-foreground">Understand the real problem, not just symptoms</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent-foreground font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Map Systems</h4>
                  <p className="text-sm text-muted-foreground">Identify all stakeholders and dependencies</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Prototype Fast</h4>
                  <p className="text-sm text-muted-foreground">Test hypotheses quickly with real users</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Scale Smart</h4>
                  <p className="text-sm text-muted-foreground">Build for today's needs, architect for tomorrow's growth</p>
                </div>
              </div>
            </div>
            
            {/* Product Case Studies */}
            <div className="space-y-12">
              <h3 className="text-3xl font-bold text-foreground text-center mb-8">How I Think: Real Product Challenges</h3>
              
              {/* Case Study 1 */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">The Challenge</h4>
                      <p className="text-sm text-muted-foreground">30% system downtime was killing user trust in our B2B platform. Traditional monitoring wasn't catching issues fast enough.</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        <Lightbulb className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">My Approach</h4>
                      <p className="text-sm text-muted-foreground">Instead of just better alerts, I designed an AI-driven system that predicts failures before they happen. We shifted from reactive to proactive.</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">The Result</h4>
                      <p className="text-sm text-muted-foreground">30% downtime reduction in 6 months. But more importantly: users started trusting our platform again, leading to 13% higher delivery velocity.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Case Study 2 */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">The Challenge</h4>
                      <p className="text-sm text-muted-foreground">20,000+ schools needed to onboard onto our EdTech platform, but traditional sales cycles were too slow for government accounts.</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">My Strategy</h4>
                      <p className="text-sm text-muted-foreground">Built a self-service onboarding flow that let schools experience value immediately. Used behavioral data to identify and remove friction points.</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">The Impact</h4>
                      <p className="text-sm text-muted-foreground">17% increase in student engagement because schools could start using the platform within hours, not weeks. Cohort analysis revealed the key insight.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </section>

      {/* Unique Value Section */}
      <section id="skills" className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">What Makes Me Different</h2>
              <p className="text-xl text-muted-foreground">Beyond typical product management - my unique edge in the market</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <Card className="card-hover p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Technical Product Leader</h3>
                    <p className="text-muted-foreground">Most PMs talk about technical debt. I actually fix it. I architect systems, write automation scripts, and speak fluent developer.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="text-muted-foreground">AI/ML system integration & deployment</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="text-muted-foreground">DevOps automation & infrastructure design</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="text-muted-foreground">Full-stack product architecture</span>
                  </div>
                </div>
              </Card>
              
              <Card className="card-hover p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Scale-First Mindset</h3>
                    <p className="text-muted-foreground">I don't just build features - I architect systems for millions of users. Every decision considers the next 10x growth phase.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-muted-foreground">20K+ schools served simultaneously</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-muted-foreground">Multi-sided platform architecture</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-muted-foreground">Enterprise B2B & government accounts</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">My Product Decision Framework</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Data Tells the Story</h4>
                  <p className="text-sm text-muted-foreground">I don't make decisions based on opinions. Every choice is backed by cohort analysis, user behavior patterns, and business impact metrics.</p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Users Over Features</h4>
                  <p className="text-sm text-muted-foreground">I talk to real users weekly, not just look at dashboards. The best product insights come from understanding why users behave the way they do.</p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">System-Level Impact</h4>
                  <p className="text-sm text-muted-foreground">Every product change affects the entire ecosystem. I map dependencies, predict second-order effects, and optimize for the whole system.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Impact by Numbers</h2>
              <p className="text-xl text-muted-foreground">Quantified results that matter to business</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">20K+</div>
                <div className="text-sm text-muted-foreground">Schools Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
                <div className="text-sm text-muted-foreground">Security Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
                <div className="text-sm text-muted-foreground">Downtime Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">18+</div>
                <div className="text-sm text-muted-foreground">Team Members Led</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">17%</div>
                <div className="text-sm text-muted-foreground">Engagement Increase</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">25%</div>
                <div className="text-sm text-muted-foreground">Roadmap Alignment</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">35K+</div>
                <div className="text-sm text-muted-foreground">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Projects Portfolio */}
      <section id="projects" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Signature Product Successes</h2>
              <p className="text-xl text-muted-foreground">Products that scaled and delivered measurable business value</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* B2B SaaS Platform */}
              <Card className="card-hover overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Users className="w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold">Multi-sided B2B Platform</h4>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">B2B SaaS Platform Development</h3>
                  <p className="text-muted-foreground mb-4">
                    Led 18-member team to build multi-sided B2B SaaS platform connecting SDV industries, academic institutions, and recruitment organizations. Increased product delivery traction by 13%.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">B2B SaaS</Badge>
                    <Badge variant="outline">Team Leadership</Badge>
                    <Badge variant="outline">Multi-sided Platform</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      18 months • 2024-Present
                    </div>
                    <span className="text-primary font-medium">
                      +13% Delivery Traction
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* DevOps System */}
              <Card className="card-hover overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Settings className="w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold">DevOps Automation</h4>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">Agentic DevOps System</h3>
                  <p className="text-muted-foreground mb-4">
                    Implemented Dev-ops agentic system with MCP architecture across platforms, codebases, AWS infra, and databases. Reduced unnecessary downtime by 30% at early release stage.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">DevOps</Badge>
                    <Badge variant="outline">AWS</Badge>
                    <Badge variant="outline">Automation</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      12 months • 2024
                    </div>
                    <span className="text-green-600 font-medium">
                      -30% Downtime
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* School Onboarding */}
              <Card className="card-hover overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Briefcase className="w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold">EdTech Platform</h4>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">School Onboarding Platform</h3>
                  <p className="text-muted-foreground mb-4">
                    Led product initiatives for self-onboarding platform serving 20,000+ schools. Performed cohort analysis driving 17% increase in student engagement through competitive differentiators.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">EdTech</Badge>
                    <Badge variant="outline">Onboarding</Badge>
                    <Badge variant="outline">Analytics</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      6 months • 2023-2024
                    </div>
                    <span className="text-orange-600 font-medium">
                      20,000+ Schools
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* AR/VR Platform */}
              <Card className="card-hover overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Rocket className="w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold">AR/VR Learning</h4>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">AR/VR Simulation Platform</h3>
                  <p className="text-muted-foreground mb-4">
                    Led team of 4 in training and executing User Acceptance Testing for AR/VR simulation-based learning platform, collaboratively resolving over 35,000 content and functional issues.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">AR/VR</Badge>
                    <Badge variant="outline">UAT</Badge>
                    <Badge variant="outline">Quality Assurance</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      24 months • 2021-2023
                    </div>
                    <span className="text-purple-600 font-medium">
                      35,000+ Issues Resolved
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Drive Your Product Success?</h2>
              <p className="text-xl text-muted-foreground mb-8">Let's discuss how I can help scale your product and deliver measurable business impact</p>
              
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-2xl mb-12 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose Me as Your Senior Product Manager?</h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <div className="font-semibold text-primary mb-2">🎯 Proven Results</div>
                    <div className="text-sm text-muted-foreground">92% security improvements, 30% downtime reduction, 17% engagement increase</div>
                  </div>
                  <div>
                    <div className="font-semibold text-accent mb-2">⚡ Technical Depth</div>
                    <div className="text-sm text-muted-foreground">AI/ML integration, DevOps automation, full-stack understanding</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-600 mb-2">👥 Scale Leadership</div>
                    <div className="text-sm text-muted-foreground">Led 18-member teams, served 20K+ schools, resolved 35K+ issues</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:jit.goria159@gmail.com" className="text-primary hover:underline">jit.goria159@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">LinkedIn</h3>
                    <p className="text-muted-foreground">in/jit-goria-3a489415a</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91-9875694452</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">Chennai, India</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="What would you like to discuss?"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me more about your opportunity..."
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Jit Goria</h3>
                <p className="text-secondary-foreground/80 mb-4">
                  Product and Engineering Leader passionate about building products that make a difference in education and technology.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
                    <Mail className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {['about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="block text-secondary-foreground/80 hover:text-secondary-foreground transition-colors capitalize"
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Get In Touch</h4>
                <div className="space-y-2 text-secondary-foreground/80">
                  <p>jit.goria159@gmail.com</p>
                  <p>+91-9875694452</p>
                  <p>Chennai, India</p>
                </div>
              </div>
            </div>
            <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-secondary-foreground/60">
              <p>&copy; 2024 Jit Goria. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
