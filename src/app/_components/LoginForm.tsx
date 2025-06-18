/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { getCurrentUser } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { loginValidationSchema } from './LoginValidation';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { PasswordInput } from '@/components/ui/password-input';
import { loginUser } from '../_actions';

const LoginForm = ({ redirectPath }: { redirectPath: string | undefined }) => {
  const router = useRouter();
  const { setUser } = useUser();
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        setUser(await getCurrentUser());
        toast.success(res?.message);
        router.push(redirectPath || '/admin');
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          Log In
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 px-4 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="h-12 px-4 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <ShinyButton
                className="w-full h-12 text-lg font-medium rounded-lg"
                style={{
                  backgroundColor: '#1E90FF',
                  border: 'none',
                }}
              >
                Log In
              </ShinyButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;