import { useState, useEffect } from "react";
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
  Clock,
  Trash2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function MessagesPage() {
  const { toast } = useToast();
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Fetch reservations with messages
  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select(`
        id,
        guest_name,
        channel,
        units (
          name,
          properties (
            name_ar,
            name
          )
        )
      `)
      .in("status", ["confirmed", "checked_in"])
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching reservations:", error);
    } else {
      setReservations(data || []);
      if (data && data.length > 0 && !selectedReservationId) {
        setSelectedReservationId(data[0].id);
      }
    }
  };

  // Fetch messages for selected reservation
  const fetchMessages = async () => {
    if (!selectedReservationId) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("reservation_id", selectedReservationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data || []);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    if (selectedReservationId) {
      fetchMessages();
    }
  }, [selectedReservationId]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedReservationId) return;

    setIsSending(true);
    try {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            reservation_id: selectedReservationId,
            sender: "host",
            content: message,
            channel: "platform",
            is_read: true,
          }
        ]);

      if (error) throw error;

      toast({
        title: "✅ تم إرسال الرسالة",
        description: "تم إرسال رسالتك بنجاح",
      });

      setMessage("");
      await fetchMessages();
    } catch (error: any) {
      console.error("Send error:", error);
      toast({
        title: "❌ فشل الإرسال",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      toast({
        title: "✅ تم حذف الرسالة",
      });

      await fetchMessages();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "❌ فشل الحذف",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const aiSuggestions = [
    "نعم، يمكنك الوصول من الساعة 12 ظهراً",
    "تسجيل الخروج حتى الساعة 11 صباحاً",
    "شكراً لك! نتمنى رؤيتك مجدداً",
  ];

  const getChannelBadge = (channel: string) => {
    const colors: { [key: string]: string } = {
      airbnb: "bg-red-500",
      booking_com: "bg-blue-600",
      direct: "bg-primary",
      agoda: "bg-purple-500",
    };
    return colors[channel] || "bg-gray-500";
  };

  const selectedReservation = reservations.find(r => r.id === selectedReservationId);

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
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  onClick={() => setSelectedReservationId(reservation.id)}
                  className={`p-4 border-b border-border/50 cursor-pointer transition-colors ${
                    selectedReservationId === reservation.id 
                      ? "bg-primary/10" 
                      : "hover:bg-muted/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-sm">{reservation.guest_name}</div>
                      <div className="text-xs text-muted-foreground">
                        {reservation.units?.properties?.name_ar || reservation.units?.properties?.name} - {reservation.units?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={`${getChannelBadge(reservation.channel)} text-white text-xs`}>
                      {reservation.channel === 'booking_com' ? 'Booking.com' : reservation.channel === 'direct' ? 'مباشر' : reservation.channel}
                    </Badge>
                  </div>
                </div>
              ))}
              {reservations.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <p>لا توجد محادثات نشطة</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 glass rounded-xl border border-border/50 flex flex-col">
            {selectedReservation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">{selectedReservation.guest_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedReservation.units?.properties?.name_ar || selectedReservation.units?.properties?.name} - {selectedReservation.units?.name}
                      </div>
                    </div>
                    <Badge className={`${getChannelBadge(selectedReservation.channel)} text-white`}>
                      {selectedReservation.channel === 'booking_com' ? 'Booking.com' : selectedReservation.channel === 'direct' ? 'مباشر' : selectedReservation.channel}
                    </Badge>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-12">
                      <p>لم يتم إرسال أي رسائل بعد</p>
                      <p className="text-sm mt-2">ابدأ المحادثة بإرسال رسالة أدناه</p>
                    </div>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "host" ? "justify-start" : "justify-end"}`}
                    >
                      <div className="flex flex-col">
                        <div className={`max-w-md ${
                          msg.sender === "host" 
                            ? "bg-muted/50 text-foreground" 
                            : "gradient-primary text-white"
                        } rounded-2xl px-4 py-3`}>
                          <div className="text-sm">{msg.content}</div>
                          <div className={`text-xs mt-1 ${
                            msg.sender === "host" ? "text-muted-foreground" : "text-white/70"
                          }`}>
                            {new Date(msg.created_at).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        {msg.sender === "host" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 text-xs text-muted-foreground hover:text-destructive self-start"
                            onClick={() => handleDeleteMessage(msg.id)}
                          >
                            <Trash2 className="w-3 h-3 ml-1" />
                            حذف
                          </Button>
                        )}
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="gradient-primary self-end" 
                      onClick={handleSendMessage}
                      disabled={isSending || !message.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>اختر محادثة لعرض الرسائل</p>
              </div>
            )}
          </div>
        </div>
      </AppShell>
    </>
  );
}