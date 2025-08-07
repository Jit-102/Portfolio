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
  X
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
                  Senior Product Manager
                </h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-white/20 text-white border-white/30 text-sm">18+ Team Leader</Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm">B2B SaaS Expert</Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm">20K+ Schools Served</Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm">92% Security Improvement</Badge>
                </div>
                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  Senior Product Manager with 5+ years driving growth in edtech and SaaS platforms. Led 18-member cross-functional teams, reduced system downtime by 30%, and scaled products serving 20,000+ schools. Expert in AI-driven DevOps automation, data analytics, and delivering measurable business impact through product excellence.
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

      {/* Experience Timeline */}
      <section id="experience" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
              <p className="text-xl text-muted-foreground">A journey of building products that matter</p>
            </div>
            
            <div className="timeline-line space-y-12">
              {/* Current Role */}
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Briefcase className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <Card className="card-hover flex-1">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Product & Engineering Manager</h3>
                        <p className="text-primary font-semibold">Creamcollar</p>
                      </div>
                      <Badge variant="secondary">May 2024 - Present</Badge>
                    </div>
                    <div className="space-y-3 mb-4">
                      <p className="text-muted-foreground">
                        • Led 18-member cross-functional team developing multi-sided B2B SaaS platform connecting SDV industries, academic institutions, and recruitment organizations
                      </p>
                      <p className="text-muted-foreground">
                        • <span className="font-semibold text-green-600">Reduced system downtime by 30%</span> through AI-driven DevOps automation with MCP architecture implementation
                      </p>
                      <p className="text-muted-foreground">
                        • <span className="font-semibold text-green-600">Achieved 92% reduction in security vulnerabilities</span> via rigorous CI/CD pipelines using GitHub Actions and SonarQube
                      </p>
                      <p className="text-muted-foreground">
                        • <span className="font-semibold text-green-600">Increased product delivery velocity by 13%</span> through strategic alignment of technical execution with business objectives
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">AI/ML Systems</Badge>
                      <Badge variant="outline">DevOps Automation</Badge>
                      <Badge variant="outline">B2B SaaS</Badge>
                      <Badge variant="outline">Team Leadership</Badge>
                      <Badge variant="outline">Security</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Previous Role 1 */}
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <Rocket className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <Card className="card-hover flex-1">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Project Manager - Govt. Accounts</h3>
                        <p className="text-accent font-semibold">Embibe-Jio</p>
                      </div>
                      <Badge variant="secondary">Nov 2023 - Apr 2024</Badge>
                    </div>
                    <div className="space-y-3 mb-4">
                      <p className="text-muted-foreground">
                        • Delivered 3 major product releases serving <span className="font-semibold text-blue-600">20,000+ schools</span> through strategic cross-functional collaboration
                      </p>
                      <p className="text-muted-foreground">
                        • <span className="font-semibold text-blue-600">Improved roadmap alignment by 25%</span> by bridging technical requirements with business stakeholder needs
                      </p>
                      <p className="text-muted-foreground">
                        • <span className="font-semibold text-blue-600">Reduced post-release defects by 30%</span> through implementation of automated testing and agile QA frameworks
                      </p>
                      <p className="text-muted-foreground">
                        • Performed cohort analysis that <span className="font-semibold text-blue-600">increased student engagement by 17%</span> via data-driven behavioral insights
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Product Strategy</Badge>
                      <Badge variant="outline">Data Analytics</Badge>
                      <Badge variant="outline">EdTech Scale</Badge>
                      <Badge variant="outline">Quality Engineering</Badge>
                      <Badge variant="outline">Stakeholder Management</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Previous Role 2 */}
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <Card className="card-hover flex-1">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Product Specialist - GTM</h3>
                        <p className="text-green-600 font-semibold">Embibe-Jio</p>
                      </div>
                      <Badge variant="secondary">Jul 2019 - Nov 2023</Badge>
                    </div>
                    <div className="space-y-3 mb-4">
                      <p className="text-muted-foreground">
                        • Built and launched <span className="font-semibold text-purple-600">first monetization model</span> for multi-sided platform through strategic GTM initiatives across B2C, B2B, and B2G segments
                      </p>
                      <p className="text-muted-foreground">
                        • Led team of 4 in UAT execution for <span className="font-semibold text-purple-600">AR/VR simulation platform</span>, successfully resolving 35,000+ content and functional issues
                      </p>
                      <p className="text-muted-foreground">
                        • <span className="font-semibold text-purple-600">Reduced project delays by 15%</span> through implementation of Jira workflows with sprint dashboards and enhanced team accountability
                      </p>
                      <p className="text-muted-foreground">
                        • Authored comprehensive PRDs and led bug resolution workflows that improved product stability and streamlined QA collaboration
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Go-to-Market Strategy</Badge>
                      <Badge variant="outline">Revenue Generation</Badge>
                      <Badge variant="outline">AR/VR Products</Badge>
                      <Badge variant="outline">Agile Methodologies</Badge>
                      <Badge variant="outline">Technical Writing</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Core Competencies</h2>
              <p className="text-xl text-muted-foreground">Technical depth + business acumen + proven results</p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="font-semibold text-green-700 dark:text-green-300">5+ Years Product Leadership</span>
                </div>
                <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  <span className="font-semibold text-blue-700 dark:text-blue-300">AI/ML Integration Expert</span>
                </div>
                <div className="flex items-center bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <span className="font-semibold text-purple-700 dark:text-purple-300">Cross-Functional Leadership</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Product Strategy */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Product Strategy & Design</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Product Roadmap Planning</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>User Experience Design (Figma)</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>A/B Testing & Experimentation</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Competitive Analysis</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Product-Market Fit</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Data Analytics */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <BarChart3 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Data Science & Analytics</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Google BigQuery & SQL</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Tableau & Looker Studio</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Cohort & Funnel Analysis</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>User Behavior Analytics</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>KPI Dashboard Creation</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Project Management */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Settings className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Project Management</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Jira</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Confluence</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>OKR/KPI Tracking</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Agile Methodology</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Technical Skills */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Settings className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">AI/ML & Technical Systems</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>AI/ML Product Integration</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>DevOps & CI/CD Automation</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Python & API Development</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>AWS/Cloud Infrastructure</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>System Architecture</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Leadership */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Handshake className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Leadership</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Cross-functional Teams</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Stakeholder Management</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>18-Member Team Lead</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Mentoring</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                    <MessageSquare className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Certifications</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Python for Data Science (IBM)</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>LLMs (Google Cloud)</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Google Data Analytics</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Software Development (TATA)</li>
                  </ul>
                </CardContent>
              </Card>
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
