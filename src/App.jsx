function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Book your free consultation</h1>
      <p className="text-xl text-slate-400">
        Component Initialization Stage...
      </p>

      <div className="mt-8 p-6 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
        <button className="bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white px-6 py-2 rounded-lg transition-colors">
          Initialize Booking
        </button>
      </div>
    </div>
  )
}

export default App
