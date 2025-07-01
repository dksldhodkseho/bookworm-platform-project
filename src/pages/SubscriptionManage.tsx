
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const SubscriptionManage = () => {
  const [subscriptionId, setSubscriptionId] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { toast } = useToast();

  const handleCheckStatus = async () => {
    setIsChecking(true);

    try {
      const response = await fetch(`/checksubscription?subscriptionId=${subscriptionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatus(data.status || "활성");
        toast({
          title: "조회 완료",
          description: "구독 상태를 확인했습니다.",
        });
      } else {
        throw new Error('Status check failed');
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "구독 상태 확인 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsCancelling(true);

    try {
      const response = await fetch('/subscriptioncancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (response.ok) {
        toast({
          title: "성공",
          description: "구독취소됨",
        });
        setSubscriptionStatus("취소됨");
      } else {
        throw new Error('Subscription cancellation failed');
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "구독 취소 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">구독 관리</CardTitle>
          <CardDescription>구독 상태 확인 및 취소</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subscriptionId">구독 ID</Label>
              <Input
                id="subscriptionId"
                value={subscriptionId}
                onChange={(e) => setSubscriptionId(e.target.value)}
                required
              />
            </div>
            
            {subscriptionStatus && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">구독 상태</p>
                <p className="font-semibold">{subscriptionStatus}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button 
                onClick={handleCheckStatus} 
                className="w-full" 
                variant="outline"
                disabled={isChecking || !subscriptionId}
              >
                {isChecking ? "확인 중..." : "상태 확인"}
              </Button>
              
              <Button 
                onClick={handleCancelSubscription} 
                className="w-full" 
                variant="destructive"
                disabled={isCancelling || !subscriptionId}
              >
                {isCancelling ? "취소 중..." : "구독 취소"}
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

export default SubscriptionManage;
