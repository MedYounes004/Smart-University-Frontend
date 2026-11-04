import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Mic, Paperclip, Bot, User, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ChatMessage, suggestedPrompts, aiKnowledgeBase } from '../data/mockData';
import { useCourse } from '../contexts/CourseContext';

export function AIAssistant() {
  const { getAllMaterials } = useCourse();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your Smart University AI Assistant. I can help you with information about courses, exams, inscription documents, and administrative procedures. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    const courseMaterials = getAllMaterials();

    // Course materials query - search through uploaded content
    const relevantMaterials = courseMaterials.filter(material => {
      const searchTerms = lowerMessage.split(' ');
      const materialText = `${material.title} ${material.content} ${material.courseName}`.toLowerCase();
      return searchTerms.some(term => term.length > 3 && materialText.includes(term));
    });

    if (relevantMaterials.length > 0) {
      const topMaterial = relevantMaterials[0];
      const snippet = topMaterial.content.substring(0, 400) + (topMaterial.content.length > 400 ? '...' : '');

      return {
        id: Date.now().toString(),
        text: `Based on the course materials for ${topMaterial.courseName}:\n\n${snippet}\n\nThis information covers key concepts related to your question. Would you like me to elaborate on any specific aspect?`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: relevantMaterials.slice(0, 3).map(material => ({
          title: material.title,
          type: `${material.courseName} - ${material.type}`,
          excerpt: material.description || material.content.substring(0, 100) + '...'
        }))
      };
    }

    // Documents query
    if (lowerMessage.includes('document') || lowerMessage.includes('inscription')) {
      return {
        id: Date.now().toString(),
        text: `For inscription, you'll need the following documents:\n\n${aiKnowledgeBase.inscription.documents.map((doc, i) => `${i + 1}. ${doc}`).join('\n')}\n\nDeadlines: ${aiKnowledgeBase.inscription.deadlines}`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          {
            title: 'Student Registration Guide 2026',
            type: 'PDF Document',
            excerpt: 'Complete list of required documents for new student registration...'
          },
          {
            title: 'Academic Calendar',
            type: 'University Policy',
            excerpt: 'Important dates and deadlines for the academic year...'
          }
        ]
      };
    }
    
    // Course exam query
    if (lowerMessage.includes('exam') && lowerMessage.includes('cs401')) {
      const exam = aiKnowledgeBase.exams.find(e => e.course === 'CS401');
      return {
        id: Date.now().toString(),
        text: `The CS401 (Advanced Algorithms) exam is scheduled for:\n\nDate: ${exam?.date}\nTime: ${exam?.time}\nLocation: ${exam?.location}\n\nMake sure to arrive 15 minutes early with your student ID.`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          {
            title: 'Final Exam Schedule - Spring 2026',
            type: 'Academic Document',
            excerpt: 'Complete examination timetable for all courses...'
          }
        ]
      };
    }
    
    // Instructor query
    if (lowerMessage.includes('dr.') || lowerMessage.includes('professor') || lowerMessage.includes('mitchell')) {
      return {
        id: Date.now().toString(),
        text: `Dr. Sarah Mitchell is a Professor in the Computer Science Department. She teaches CS401 - Advanced Algorithms.\n\nOffice: Building A, Room 405\nOffice Hours: Tuesday & Thursday, 3:00-5:00 PM\nEmail: s.mitchell@university.edu\n\nDr. Mitchell specializes in algorithm optimization and has published over 40 research papers.`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          {
            title: 'Faculty Directory',
            type: 'University Database',
            excerpt: 'Contact information and profiles for all teaching staff...'
          },
          {
            title: 'CS Department Page',
            type: 'Website',
            excerpt: 'Computer Science faculty members and their specializations...'
          }
        ]
      };
    }
    
    // Transcript request
    if (lowerMessage.includes('transcript')) {
      return {
        id: Date.now().toString(),
        text: `To request a transcript:\n\n${aiKnowledgeBase.administrative.transcriptRequest}\n\nYou can submit your request through the Student Portal under "Academic Records".`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          {
            title: 'Student Services Handbook',
            type: 'Policy Document',
            excerpt: 'Guidelines for requesting official academic documents...'
          }
        ]
      };
    }
    
    // Course credits
    if (lowerMessage.includes('credit') && lowerMessage.includes('linear algebra')) {
      return {
        id: Date.now().toString(),
        text: `MATH302 - Linear Algebra is a 4-credit course.\n\nInstructor: Prof. James Chen\nSchedule: Tuesday & Thursday, 2:00 PM\nLocation: Building B, Room 205\n\nThis course covers vector spaces, linear transformations, eigenvalues and eigenvectors, and applications to differential equations.`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          {
            title: 'Course Catalog 2025-2026',
            type: 'Academic Document',
            excerpt: 'Complete listing of all courses with credit information...'
          }
        ]
      };
    }
    
    // Withdrawal deadline
    if (lowerMessage.includes('withdrawal') || lowerMessage.includes('drop')) {
      return {
        id: Date.now().toString(),
        text: `Course Withdrawal Information:\n\n${aiKnowledgeBase.administrative.courseWithdrawal}\n\nPlease note that withdrawing after the deadline may result in a "W" grade on your transcript.`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          {
            title: 'Academic Policies',
            type: 'University Regulation',
            excerpt: 'Rules and procedures for course registration changes...'
          }
        ]
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      text: `I understand you're asking about "${userMessage}". I can help with:\n\n• Course information and schedules\n• Exam dates and locations\n• Instructor details and office hours\n• Required documents for inscription\n• Administrative procedures\n• Academic policies\n\nCould you please be more specific about what you'd like to know?`,
      sender: 'assistant',
      timestamp: new Date(),
      sources: [
        {
          title: 'Student Handbook 2026',
          type: 'General Reference',
          excerpt: 'Comprehensive guide to university policies and procedures...'
        }
      ]
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
            <div className="space-y-2">
              {suggestedPrompts.slice(0, 4).map((prompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="w-full text-left p-3 rounded-xl border border-border hover:border-primary hover:bg-accent transition-all text-sm"
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'assistant' 
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                : 'bg-primary'
            }`}>
              {message.sender === 'assistant' ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            
            <div className={`flex-1 max-w-[80%] ${message.sender === 'user' ? 'items-end' : ''}`}>
              <Card className={`p-4 ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </Card>
              
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium px-1">Sources:</p>
                  {message.sources.map((source, idx) => (
                    <Card key={idx} className="p-3 bg-accent/50 hover:bg-accent cursor-pointer transition-colors">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium">{source.title}</p>
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{source.type}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{source.excerpt}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-2 px-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <Card className="p-4 bg-card">
              <div className="flex gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              </div>
            </Card>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl flex-shrink-0 h-12 w-12"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything..."
                className="min-h-[48px] max-h-32 rounded-xl resize-none pr-12"
                rows={1}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 bottom-1 rounded-lg"
              >
                <Mic className="w-5 h-5" />
              </Button>
            </div>
            
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              size="icon"
              className="rounded-xl flex-shrink-0 h-12 w-12"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
