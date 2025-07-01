
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const WriterManage = () => {
  const [writerId, setWriterId] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const { toast } = useToast();

  const handleApprove = async () => {
    setIsApproving(true);

    try {
      const response = await fetch('/writerapprove', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ writerId }),
      });

      if (response.ok) {
        toast({
          title: "성공",
          description: "작가승인됨",
        });
        setWriterId("");
      } else {
        throw new Error('Writer approval failed');
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "작가 승인 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);

    try {
      const response = await fetch('/writerreject', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ writerId }),
      });

      if (response.ok) {
        toast({
          title: "성공",
          description: "작가거절됨",
        });
        setWriterId("");
      } else {
        throw new Error('Writer rejection failed');
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "작가 거절 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">작가 관리</CardTitle>
          <CardDescription>작가 신청을 승인하거나 거절하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="writerId">작가 ID</Label>
              <Input
                id="writerId"
                value={writerId}
                onChange={(e) => setWriterId(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={handleApprove} 
                className="flex-1 bg-green-600 hover:bg-green-700" 
                disabled={isApproving || !writerId}
              >
                {isApproving ? "승인 중..." : "승인"}
              </Button>
              <Button 
                onClick={handleReject} 
                className="flex-1" 
                variant="destructive"
                disabled={isRejecting || !writerId}
              >
                {isRejecting ? "거절 중..." : "거절"}
              </Button>
            </div>
          </div>
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

export default WriterManage;
