import { useState } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { AppShell } from "@/components/dashboard/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Send,
  Download,
  MoreVertical
} from "lucide-react";

export default function TicketDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [reply, setReply] = useState("");

  // Mock ticket data
  const ticket = {
    id: "TKT-2847",
    title: "مشكلة في مزامنة الحجوزات من Booking.com",
    status: "in-progress",
    priority: "urgent",
    category: "تقني",
    createdAt: "2026-05-07 08:30",
    assignedTo: "فريق التطوير",
    user: { name: "أحمد محمد", email: "ahmed@example.com" },
    description: "الحجوزات الجديدة لا تظهر في النظام منذ ساعتين. آخر حجز تم مزامنته كان الساعة 06:15 صباحاً.",
    attachments: [
      { name: "screenshot-error.png", size: "245 KB" },
      { name: "booking-details.pdf", size: "89 KB" }
    ],
    replies: [
      {
        id: 1,
        author: "فريق الدعم",
        role: "support",
        message: "شكراً لتواصلك معنا. تم تحويل التذكرة لفريق التطوير لفحص مشكلة المزامنة.",
        timestamp: "منذ ساعة",
        date: "2026-05-07 09:45"
      },
      {
        id: 2,
        author: "فريق التطوير",
        role: "developer",
        message: "تم فحص السيرفر ووجدنا أن Booking.com API كانت متوقفة مؤقتاً. تم إعادة تشغيل المزامنة الآن والحجوزات المفقودة يتم استيرادها تدريجياً.",
        timestamp: "منذ 30 دقيقة",
        date: "2026-05-07 10:15"
      },
      {
        id: 3,
        author: "أحمد محمد",
        role: "user",
        message: "ممتاز! بدأت الحجوزات تظهر الآن. هل سيتم استيراد جميع الحجوزات المفقودة تلقائياً؟",
        timestamp: "منذ 15 دقيقة",
        date: "2026-05-07 10:30"
      }
    ]
  };

  const statusConfig = {
    open: { 
      label: "جديدة", 
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      icon: AlertCircle 
    },
    "in-progress": { 
      label: "قيد المعالجة", 
      color: "bg-accent/10 text-accent-foreground border-accent/20",
      icon: Clock 
    },
    closed: { 
      label: "محلولة", 
      color: "bg-primary/10 text-primary border-primary/20",
      icon: CheckCircle2 
    }
  };

  const priorityConfig = {
    urgent: { label: "عاجل", color: "bg-destructive/10 text-destructive border-destructive/20" },
    high: { label: "عالي", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
    medium: { label: "متوسط", color: "bg-accent/10 text-accent-foreground border-accent/20" },
    low: { label: "منخفض", color: "bg-muted text-muted-foreground border-border" }
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle sending the reply
    setReply("");
  };

  const StatusIcon = statusConfig[ticket.status as keyof typeof statusConfig].icon;

  return (
    <>
      <SEO title={`${ticket.id} - الدعم الفني - داريوم`} />
      <AppShell>
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard/support")}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="font-mono">
                  {ticket.id}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={statusConfig[ticket.status as keyof typeof statusConfig].color}
                >
                  <StatusIcon className="w-3 h-3 ml-1" />
                  {statusConfig[ticket.status as keyof typeof statusConfig].label}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={priorityConfig[ticket.priority as keyof typeof priorityConfig].color}
                >
                  {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{ticket.title}</h1>
            </div>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          {/* Ticket Info */}
          <div className="glass p-6 rounded-xl border border-border/50">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">تم الإنشاء:</span>
                <span className="mr-2 font-medium">{ticket.createdAt}</span>
              </div>
              <div>
                <span className="text-muted-foreground">التصنيف:</span>
                <span className="mr-2 font-medium">{ticket.category}</span>
              </div>
              <div>
                <span className="text-muted-foreground">مُنشئ التذكرة:</span>
                <span className="mr-2 font-medium">{ticket.user.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">مُعين إلى:</span>
                <Badge variant="outline" className="mr-2 bg-primary/10 text-primary">
                  {ticket.assignedTo}
                </Badge>
              </div>
            </div>
          </div>

          {/* Original Message */}
          <div className="glass p-6 rounded-xl border border-border/50">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-10 h-10 gradient-primary">
                <AvatarFallback className="text-white">
                  {ticket.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{ticket.user.name}</span>
                  <span className="text-sm text-muted-foreground">{ticket.createdAt}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {ticket.description}
                </p>
                
                {ticket.attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium mb-2">المرفقات:</p>
                    {ticket.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-4">
            {ticket.replies.map((r) => (
              <div key={r.id} className="glass p-6 rounded-xl border border-border/50">
                <div className="flex items-start gap-4">
                  <Avatar className={`w-10 h-10 ${
                    r.role === "support" ? "bg-primary/20" :
                    r.role === "developer" ? "bg-accent/20" :
                    "gradient-primary"
                  }`}>
                    <AvatarFallback className={
                      r.role === "user" ? "text-white" : ""
                    }>
                      {r.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{r.author}</span>
                      {r.role !== "user" && (
                        <Badge variant="outline" className="text-xs bg-muted/50">
                          {r.role === "support" ? "فريق الدعم" : "فريق التطوير"}
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground mr-auto">{r.timestamp}</span>
                    </div>
                    <p className="text-foreground">{r.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          {ticket.status !== "closed" && (
            <form onSubmit={handleSubmitReply} className="glass p-6 rounded-xl border border-border/50">
              <div className="space-y-4">
                <Textarea
                  placeholder="اكتب ردك هنا..."
                  rows={4}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    سيتم إشعار {ticket.assignedTo} بردك
                  </div>
                  <Button type="submit" className="gradient-primary">
                    <Send className="w-4 h-4 ml-2" />
                    إرسال الرد
                  </Button>
                </div>
              </div>
            </form>
          )}

          {ticket.status === "closed" && (
            <div className="glass p-6 rounded-xl border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <p className="font-medium">تم إغلاق هذه التذكرة</p>
              </div>
            </div>
          )}
        </div>
      </AppShell>
    </>
  );
}