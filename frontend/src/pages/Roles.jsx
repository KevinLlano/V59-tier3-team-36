import { useQuery } from '@tanstack/react-query';
import { Palette, Shield, Code, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { fetchRoles } from '../api/roles';

const Roles = () => {

  const howItWOrksSteps = [
    "Choose a role to begin your practice session",
    "Answer multiple-choice questions one at a time",
    "You have up to 3 attempts per question",
    "Review your performance summary at the end"
  ];

  const icons = {
    "Scrum Product Owner": <Shield className="text-[#079669]" />,
    "Scrum Master": <Briefcase className="text-[#079669]" />,
    "Web Developer": <Code className="text-[#079669]" />,
    "Python Developer": <Code className="text-blue-600" />,
    "UI/UX Designer": <Palette className="text-[#079669]" />,
  }

  const { data: roles, isLoading, isError, error } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles
  })

  return (
    <div>

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Role</h2>
        <p className="text-lg text-gray-600">Select the role you want to practice interview questions for</p>
      </div>

      {/* List of roles in card view */}
      {isError ? <p className="text-red-500 mb-4">Error loading roles: {error.message}</p>
        :
        isLoading ? <p>Loading roles...</p>
          :
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {roles.map((role) => {
              const Icon = icons[role.name] || <Shield className="size-12 text-gray-600" />;
              return (

                <Card
                  key={role._id}
                  icon={
                    <div className={"size-12 rounded-lg flex items-center justify-center bg-[#D1FAE5]"}> {Icon} </div>}
                  title={role.name}
                  description={`${role.questionCount} question${role.questionCount > 1 ? "s" : ""} available`}
                  action={<Link className="block bg-[#079669] text-white text-center w-full py-2 px-4 rounded hover:bg-green-700 transition duration-300 font-semibold" to={`/questions?role=${encodeURIComponent(role.name)}`} >Start practice </Link>} />
              )
            })}
          </div>
      }

      {/* How it works section */}
      <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">📝 How It Works</h3>
        <ul className="space-y-2 text-emerald-800 list-disc list-inside">
          {howItWOrksSteps.map((step, index) => {
            return (
              <li key={index}>{step}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Roles
