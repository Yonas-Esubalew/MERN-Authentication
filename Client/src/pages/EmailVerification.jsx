import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const EmailVerification = () => {
    const [code, setCode] = useState('');
    const inputRefs = useRef([])
    const navigate = useNavigate();
  return (
    <div>EmailVerification</div>
  )
}

export default EmailVerification