
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Book, Check } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">출판 관리 시스템</h1>
          <p className="text-xl text-gray-600">사용자, 작가, 도서를 종합적으로 관리하는 플랫폼</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* 사용자 기능 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <CardTitle>사용자 기능</CardTitle>
              <CardDescription>회원가입 및 구독 관리</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/register">
                <Button className="w-full" variant="outline">회원가입</Button>
              </Link>
              <Link to="/subscribe">
                <Button className="w-full" variant="outline">구독 요청</Button>
              </Link>
              <Link to="/writer-request">
                <Button className="w-full" variant="outline">작가 신청</Button>
              </Link>
              <Link to="/subscription-manage">
                <Button className="w-full" variant="outline">구독 관리</Button>
              </Link>
            </CardContent>
          </Card>

          {/* 작가 기능 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Book className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <CardTitle>작가 기능</CardTitle>
              <CardDescription>도서 작성 및 출간 관리</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/write-book">
                <Button className="w-full" variant="outline">도서 작성</Button>
              </Link>
              <Link to="/publish-request">
                <Button className="w-full" variant="outline">출간 요청</Button>
              </Link>
              <Link to="/delete-book">
                <Button className="w-full" variant="outline">도서 삭제</Button>
              </Link>
            </CardContent>
          </Card>

          {/* 관리자 기능 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Check className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <CardTitle>관리자 기능</CardTitle>
              <CardDescription>작가 승인 및 관리</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/writer-manage">
                <Button className="w-full" variant="outline">작가 관리</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
