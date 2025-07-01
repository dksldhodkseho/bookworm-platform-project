
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const WriteBook = () => {
  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    content: "",
    writerId: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "성공",
          description: "작성됨",
        });
        setFormData({ bookId: "", title: "", content: "", writerId: "" });
      } else {
        throw new Error('Book writing failed');
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "도서 작성 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">도서 작성</CardTitle>
          <CardDescription>새로운 도서를 작성하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bookId">도서 ID</Label>
                <Input
                  id="bookId"
                  value={formData.bookId}
                  onChange={(e) => setFormData(prev => ({ ...prev, bookId: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="writerId">작가 ID</Label>
                <Input
                  id="writerId"
                  value={formData.writerId}
                  onChange={(e) => setFormData(prev => ({ ...prev, writerId: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={8}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "작성 중..." : "작성"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              메인으로 돌아가기
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WriteBook;
