import Button from '../components/Button'
import Card from '../components/Card'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1 className='text-6xl text-center font-bold p-3' >Practice Interview Questions</h1>
        <h1 className='text-3xl text-green-600 text-center font-bold'>Anytime</h1>
        <p className='text-center text-xl text-gray-500 pt-3 pb-10 justify-center text-wrap ' >Prepare for your next role with AI-powered interview practice. Choose your role and master the questions that matter.</p>
      </div>

      <div className='grid gap-6 md:grid-cols-3' >
        <Card
          icon={<CheckCircle className='text-green-600' size={32} />}
          title='Multiple Questions'
          description='Practice questions tailored for Scrum Masters, Product Owners, Developers, and Designers' 
        />
        <Card
          icon={<CheckCircle className='text-green-600' size={32} />}
          title='Instant feedback'
          description='Get immediate feedback on your answers with up to 3 attempts per question'
        />
        <Card
          icon={<CheckCircle className='text-green-600' size={32} />}
          title='Track Progress'
          description='View detailed summaries and statistics after completing each session' 
        />
      </div>
        <div className='flex items-center justify-center' >
          <Button  buttonText='Get Started' icon={<ArrowRight />} onButtonClick={() => navigate('/roles')} className='text-center' />
        </div>

      <div className='bg-emerald-50 rounded-lg p-6 mt-8 border border-emerald-100'>
        <h3 className='text-lg font-semibold text-gray-900 mb-3'>What You'll Get:</h3>
        <ul className='space-y-2 text-gray-700' >
          <li className='flex items-start gap-2' >
            <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>curated interview questions for each chingu role</span>
          </li>
          <li className='flex items-start gap-2' >
            <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Multiple choice format with detailed explanations</span>
          </li>
          <li className='flex items-start gap-2' >
            <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Performance trackinng and statistics</span>
          </li>
          <li className='flex items-start gap-2' >
            <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Practice as many times as you need to build confidence</span>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default Home
