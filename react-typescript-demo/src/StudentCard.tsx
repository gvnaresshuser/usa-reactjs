interface Student {
  name: string;
  age: number;
  course: string;
  experience: string;
}

interface StudentCardProps {
  student: Student;
}

function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="group w-full max-w-md">
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-indigo-500/20">
        {/* Top Gradient */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />

        {/* Profile Content */}
        <div className="relative px-8 pb-8">
          {/* Avatar */}
          <div className="-mt-16 mb-5 flex justify-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-white bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl font-bold text-white shadow-xl">
              {student.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Name */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">
              {student.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">Student</p>

            {/* Experience Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {student.experience}
            </div>
          </div>

          {/* Divider */}
          <div className="my-7 h-px bg-slate-200" />

          {/* Details */}
          <div className="space-y-4">
            {/* Age */}
            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                🎂
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Age
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {student.age} years
                </p>
              </div>
            </div>

            {/* Course */}
            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xl">
                📚
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Course
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {student.course}
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                🚀
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Experience
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {student.experience}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-7 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4 text-center">
            <p className="text-sm font-medium text-indigo-700">
              Ready to learn React + TypeScript 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
