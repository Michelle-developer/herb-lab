import { useEffect } from 'react';
import axios from '../src/utils/api';

function LoginTest() {
  useEffect(() => {
    async function loginTest() {
      const payload = {
        email: 'guest_user_1@herblab.dev',
        password: 'herblab000',
      };

      try {
        console.log('⚠️LoginTest', payload);
        await axios.post('/users/login', payload, { withCredentials: true });

        const res = await axios.get('/users/me', { withCredentials: true });
        console.log('🎉 驗證成功', res.data);
      } catch (err) {
        console.error('❌ 驗證失敗', err.response || err);
      }
    }

    loginTest();
  }, []);

  return <div>Login test running...</div>;
}

export default LoginTest;
