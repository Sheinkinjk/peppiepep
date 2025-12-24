'use client'

import { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Calendar, Building2, CheckCircle, Clock, XCircle } from "lucide-react";

interface PartnerReferral {
  id: string;
  referred_name: string | null;
  referred_email: string | null;
  referred_phone: string | null;
  status: string | null;
  created_at: string | null;
}

interface PartnerReferralsTabProps {
  referrals: PartnerReferral[];
}

export function PartnerReferralsTab({ referrals }: PartnerReferralsTabProps) {
  const metrics = useMemo(() => {
    const total = referrals.length;
    const pending = referrals.filter(r => r.status === 'pending').length;
    const completed = referrals.filter(r => r.status === 'completed').length;
    const rejected = referrals.filter(r => r.status === 'rejected').length;

    // Calculate potential commission (assuming $200/mo avg subscription)
    const avgSubscription = 200;
    const commissionRate = 0.25;
    const monthlyCommission = completed * avgSubscription * commissionRate;
    const annualCommission = monthlyCommission * 12;

    return {
      total,
      pending,
      completed,
      rejected,
      monthlyCommission,
      annualCommission,
      conversionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : '0.0'
    };
  }, [referrals]);

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500 hover:bg-amber-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Referrals</p>
              <p className="text-3xl font-bold">{metrics.total}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Partner applications referred</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Partners</p>
              <p className="text-3xl font-bold">{metrics.completed}</p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Became paying customers</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly Commission</p>
              <p className="text-3xl font-bold">${metrics.monthlyCommission.toFixed(0)}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">25% recurring revenue</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <p className="text-3xl font-bold">{metrics.conversionRate}%</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Application → Customer</p>
        </Card>
      </div>

      {/* Commission Projection */}
      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">💰 Annual Recurring Revenue Projection</h3>
            <p className="text-4xl font-bold text-emerald-700 mb-2">${metrics.annualCommission.toLocaleString()}/year</p>
            <p className="text-sm text-emerald-600">
              Based on {metrics.completed} active partner{metrics.completed !== 1 ? 's' : ''} × $200/mo avg × 25% commission
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-emerald-600 mb-1">Monthly breakdown:</p>
            <p className="text-2xl font-bold text-emerald-700">${metrics.monthlyCommission.toFixed(0)}/mo</p>
          </div>
        </div>
      </Card>

      {/* Referrals Table */}
      <Card>
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Partner Referral Applications</h3>
          <p className="text-sm text-muted-foreground">Businesses referred to the Refer Labs partner program</p>
        </div>

        {referrals.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No partner referrals yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your referral link to start earning commission
            </p>
            <a
              href="/referral"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Your Referral Link
            </a>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company / Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{referral.referred_name || 'Unknown'}</div>
                      <div className="text-sm text-muted-foreground">Partner Application</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {referral.referred_email && (
                      <a href={`mailto:${referral.referred_email}`} className="text-sm hover:underline">
                        {referral.referred_email}
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {referral.referred_phone && (
                      <a href={`tel:${referral.referred_phone}`} className="text-sm hover:underline">
                        {referral.referred_phone}
                      </a>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(referral.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(referral.created_at)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Help Text */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <div className="rounded-full bg-blue-100 p-2 h-fit">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">How Partner Referral Commission Works</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• You earn 25% of the monthly subscription fee for every business you refer</li>
              <li>• Commission is paid monthly for the lifetime of the customer</li>
              <li>• Track attribution through your unique referral link: <code className="bg-blue-100 px-1 rounded">/r/your-code</code></li>
              <li>• Referrals are automatically tracked when businesses apply through your link</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
