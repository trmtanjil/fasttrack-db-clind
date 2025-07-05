import React from 'react'
import useAuth from '../../../hoocks/useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hoocks/useAxiosSecure'
import LoadingId from '../../Loading/Loading'

function PaymentHistry() {

    const {user}=useAuth()
    const axiosSecure = useAxiosSecure()

    const {ispanding, data: payments=[]}=useQuery({
          queryKey: ['payments', user.email],  // ✅ Array
        queryFn:async ()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    if(ispanding){
        return <LoadingId></LoadingId>
    }
    console.log(payments)


  return (
        <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Payment History</h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead>
            <tr className="bg-gray-700 text-gray-200 uppercase text-xs tracking-wider">
              <th className="px-6 py-4 text-center">#</th>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Parcel ID</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((payment, index) => (
              <tr
                key={payment.transactionId}
                className="border-b border-gray-700 hover:bg-gray-800 transition duration-200"
              >
                <td className="px-6 py-4 text-center font-semibold text-blue-400">{index + 1}</td>
                <td className="px-6 py-4 break-all">{payment.transactionId}</td>
                <td className="px-6 py-4 break-all text-gray-300">{payment._id}</td>
                <td className="px-6 py-4 font-semibold text-green-400">${payment.amount}</td>
                <td className="px-6 py-4 capitalize">{payment.paymentMethod}</td>
                <td className="px-6 py-4 text-blue-300">{payment.email}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(payment.payment_date).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentHistry