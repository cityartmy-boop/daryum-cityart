import { useState } from "react";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Send,
  Sparkles,
  Clock
} from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number>(0);
  const [message, setMessage] = useState("");

  const conversations = [
    {
      id: 1,
      guest: "أحمد محمد السعيد",
      unit: "جناح 101",
      lastMessage: "شكراً، سأصل في الموعد المحدد",
      time: "منذ 5 دقائق",
      unread: 0,
      channel: "Airbnb",
      channelColor: "bg-[#FF5A5F]",
      messages: [
        { id: 1, sender: "guest", text: "مرحباً، هل يمكنني الوصول المبكر؟", time: "10:30 ص" },
        { id: 2, sender: "host", text: "مرحباً بك! نعم، يمكنك الوصول من الساعة 12 ظهراً", time: "10:35 ص" },
        { id: 3, sender: "guest", text: "شكراً، سأصل في الموعد المحدد", time: "10:40 ص" },
      ]
    },
    {
      id: 2,
      guest: "سارة أحمد الفهد",
      unit: "فيلا A1",
      lastMessage: "ما هي ساعات تسجيل الخروج؟",
      time: "منذ ساعة",
      unread: 2,
      channel: "Booking.com",
      channelColor: "bg-[#003580]",
      messages: [
        { id: 1, sender: "guest", text: "ما هي ساعات تسجيل الخروج؟", time: "9:15 ص" },
      ]
    },
    {
      id: 3,
      guest: "محمد علي الزهراني",
      unit: "جناح 102",
      lastMessage: "شكراً على الإقامة الرائعة",
      time: "منذ 3 ساعات",
      unread: 0,
      channel: "Direct",
      channelColor: "bg-primary",
      messages: [
        { id: 1, sender: "guest", text: "شكراً على الإقامة الرائعة", time: "7:30 ص" },
        { id: 2, sender: "host", text: "شكراً لك! نتمنى رؤيتك مجدداً", time: "7:45 ص" },
      ]
    },
  ];

  const aiSuggestions = [
    "نعم، يمكنك الوصول من الساعة 12 ظهراً",
    "تسجيل الخروج حتى الساعة 11 صباحاً",
    "شكراً لك! نتمنى رؤيتك مجدداً",
  ];

  return (
    <>
      <SEO title="الرسائل - داريوم" />
      <AppShell>
        <div className="h-[calc(100vh-8rem)] flex gap-6">
          {/* Conversations List */}
          <div className="w-80 glass rounded-xl border border-border/50 flex flex-col">
            <div className="p-4 border-b border-border/50">
              <h2 className="text-xl font-bold mb-4">الرسائل</h2>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="البحث في المحادثات..."
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id - 1)}
                  className={`p-4 border-b border-border/50 cursor-pointer transition-colors ${
                    selectedConversation === conv.id - 1 
                      ? "bg-primary/10" 
                      : "hover:bg-muted/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-sm">{conv.guest}</div>
                      <div className="text-xs text-muted-foreground">{conv.unit}</div>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-destructive text-white">{conv.unread}</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2 truncate">{conv.lastMessage}</div>
                  <div className="flex items-center justify-between">
                    <Badge className={`${conv.channelColor} text-white text-xs`}>
                      {conv.channel}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {conv.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 glass rounded-xl border border-border/50 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">{conversations[selectedConversation].guest}</div>
                  <div className="text-sm text-muted-foreground">{conversations[selectedConversation].unit}</div>
                </div>
                <Badge className={`${conversations[selectedConversation].channelColor} text-white`}>
                  {conversations[selectedConversation].channel}
                </Badge>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {conversations[selectedConversation].messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "host" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-md ${
                    msg.sender === "host" 
                      ? "bg-muted/50 text-foreground" 
                      : "gradient-primary text-white"
                  } rounded-2xl px-4 py-3`}>
                    <div className="text-sm">{msg.text}</div>
                    <div className={`text-xs mt-1 ${
                      msg.sender === "host" ? "text-muted-foreground" : "text-white/70"
                    }`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggestions */}
            <div className="p-4 border-t border-border/50 bg-muted/20">
              <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>اقتراحات ذكية:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setMessage(suggestion)}
                    className="text-xs hover:bg-primary/10"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  className="resize-none"
                  rows={2}
                />
                <Button className="gradient-primary self-end">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}