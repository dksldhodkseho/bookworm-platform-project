
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const PublishRequest = () => {
  const [formData, setFormData] = useState({
    bookId: "",
    writerId: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/publishrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "성공",
          description: "출간요청됨",
        });
        setFormData({ bookId: "", writerId: "" });
      } else {
        throw new Error('Publish request failed');
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "출간 요청 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">출간 요청</CardTitle>
          <CardDescription>작성한 도서의 출간을 요청하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "요청 중..." : "출간 요청"}
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

export default PublishRequest;
