import Card from '../components/Card'

function Home() {
  return (
    <div>
      <div>
        <h1>Practice Interview Questions</h1>
        <h1>Anytime</h1>
        <p>Prepare for your next role with AI-powered interview practice. Choose your role and master the questions that matter.</p>
      </div>

      <div className='grid gap-6 md:grid-cols-3' >
        <Card
          icon='icon'
          title='Mutiple Questions'
          description='Practice questions tailored for Scrum Masters, Product Owners, Developers, and Designers' 
        />
        <Card
          icon='icon'
          title='Instant feedback'
          description='Get immediate feedback on your answers with up to 3 attempts per question'
        />
        <Card
          icon='icon'
          title='Track Progress'
          description='View detailed summaries and statistics after completing each session' 
        />

        <button>Get Started</button>
      </div>

      <div>
        <h3>what you'll get:</h3>
        <ul>
          <li>curated interview questions for each chingu role</li>
          <li>Multiple choice format with detailed explanations</li>
          <li>Performance trackinng and statistics</li>
          <li>Practice as many times as you need to build confidence</li>
        </ul>
      </div>

    </div>
  )
}

export default Home
