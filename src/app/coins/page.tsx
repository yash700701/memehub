"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const CoinPage = () => {

  type transactionType = {
      _id: string;
      userId: string;
      description: string;
      createdAt: Date;
      amount: number;
  }

  const [coinBalance, setCoinBalance] = useState(0);
  const [transactions, setTransactions] = useState<transactionType[]>([]);
  const perks = [
      { id: 1, name: "Profile Badge", cost: 50 },
      { id: 2, name: "Feature Post", cost: 100 },
    ];

  const [ userIdFromSession, setUserIdFromSession] = useState<string | undefined>("");
  // const [userNameFromSession, setUserNameFromSession] = useState<string | undefined>("");

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("userid:", session?.user?._id);
      console.log("userName:", session?.user?.userName);
      
      setUserIdFromSession( session?.user?._id);
      // setUserNameFromSession(session?.user?.userName);
    }
  }, [status]); 

  const router = useRouter();
  useEffect(() => {
    router.prefetch("/");
  }, []);
  useEffect(() => {
    router.prefetch("/search");
  }, []);

  useEffect(()=>{
    fetchCoinAmount();
    fetchTransactionHistory();
  },[userIdFromSession])

  const fetchTransactionHistory = async()=> {
    try {
      const res = await axios.post("/api/getTransactionHistory", {userIdFromSession});
      setTransactions(res.data.transactions);

      
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCoinAmount = async()=> {
    try {
      const res = await axios.post("/api/getUser", {userIdFromSession});
      console.log(res.data.res.coinCount);
      setCoinBalance(res.data.res.coinCount);

      
    } catch (error) {
      console.log(error);
    }
  }

  return (
   <div className="w-full bg-zinc-950">
        <div className="max-w-6xl   mx-auto p-6 space-y-6">
      {/* Total Coins */}
      <Card className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white text-center shadow-xl rounded-2xl">
        <CardContent className="py-10">
          <h2 className="text-2xl font-bold">Your Coin Balance</h2>
          <p className="text-5xl font-extrabold mt-2">{coinBalance} 🪙</p>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card className=" bg-zinc-950 text-zinc-100">
        <CardContent className="py-6 space-y-4">
          <h3 className="text-xl font-semibold">Coin Transactions</h3>
          {transactions.map(tx => (
            <div key={tx._id} className="flex justify-between border-b pb-2">
              <span>{tx.description}</span>
              <span className="text-green-600 font-semibold">+{tx.amount}</span>
              <span className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Perks */}
      <Card className=" bg-zinc-950 text-zinc-100">
        <CardContent className="py-6 space-y-4">
          <h3 className="text-xl font-semibold">Available Perks</h3>
          {perks.map(perk => (
            <div key={perk.id} className="flex justify-between items-center border-b pb-2">
              <span>{perk.name}</span>
              <span className="font-semibold">{perk.cost} 🪙</span>
              <Button variant="outline" size="sm" className="text-zinc-950">Redeem</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className=" bg-zinc-950 text-zinc-100">
        <CardContent className="py-6 space-y-2">
          <h3 className="text-xl font-semibold">How to Earn Coins</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>Create posts (+10 coins)</li>
            <li>Signup (+50 coins)</li>
            <li>Complete profile (+15 coins)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
   </div>
  );
};

export default CoinPage;
