import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'BE BOULDER - Login',
  description:
    'Log in to your account to be able to use all features of BE BOULDER.',
  icons: {
    shortcut: '/favicon.svg',
  },
};

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }

  // if no render login component
  return (
    <main>
      <div
        className="hero min-h-screen -mt-6"
        style={{
          backgroundImage: `url("/images/climbing_wall.jpg")`,
        }}
      >
        <div className="flex flex-col items-center hero-overlay bg-opacity-60">
          <h1 className="text-xl text-white mt-4 mb-1">
            <b>LOGIN</b>
          </h1>
          <div className="flex items-center justify-center">
            <LoginForm returnTo={props.searchParams.returnTo} />
          </div>
        </div>
      </div>
    </main>
  );
}
