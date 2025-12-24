import React, { useEffect, useState } from "react";

function DashBoard() {
    const [file, setFile] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [search, setSearch] = useState({
        technology: "",
        role: "",
        experience: ""
    });

    useEffect(() => {
        fetch("http://localhost:8383/questions")
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
                setFiltered(data);
            })
            .catch(err => console.error(err));
    }, []);


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

  const handleUpload = async () => {
  if (!file) return alert("Please select a CSV file!");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:8383/questions/questions", {
      method: "POST",
      body: formData,
    });

    const uploaded = await res.json();

    // Save to DB
    const addRes = await fetch("http://localhost:8383/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(uploaded),
    });

    const saved = await addRes.json();

    setQuestions(prev => [
      ...prev,
      ...(Array.isArray(saved) ? saved : [saved])
    ]);

  } catch (err) {
    console.error(err);
  }
};


    const applyFilter = updated => {
        const result = questions.filter(q =>
            (updated.technology === "" ||
                q.technology?.toLowerCase().includes(updated.technology.toLowerCase())) &&
            (updated.role === "" ||
                q.role?.toLowerCase().includes(updated.role.toLowerCase())) &&
            (updated.experience === "" ||
                Number(q.experience) === Number(updated.experience))
        );

        setFiltered(result);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        const updated = { ...search, [name]: value };
        setSearch(updated);

        applyFilter(updated);
    };



    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Question Board
            </h2>

            {/* Search Bar */}
            <div

                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            >
                <input
                    name="technology"
                    placeholder="Search by technology"
                    value={search.technology}
                    onChange={handleChange}
                    className="border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />

                <input
                    name="role"
                    placeholder="Search by role"
                    value={search.role}
                    onChange={handleChange}
                    className="border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />

                <input
                    name="experience"
                    type="number"
                    placeholder="Search by experience"
                    value={search.experience}
                    onChange={handleChange}
                    className="border rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
            </div>

            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="border rounded-lg px-3 py-2 mb-4"
            />
            <button
                onClick={handleUpload}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
                Upload
            </button>

            {/* List */}
            <div className="space-y-4">
                {filtered.map(q => (
                    <div
                        key={q.id}
                        className="border rounded-2xl p-5 shadow hover:shadow-lg transition bg-white"
                    >
                        <p className="font-semibold text-gray-900">{q.question}</p>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-3">
                            <span className="px-3 py-1 bg-indigo-100 rounded-full">
                                🛠 {q.technology}
                            </span>
                            <span className="px-3 py-1 bg-emerald-100 rounded-full">
                                👤 {q.role}
                            </span>
                            <span className="px-3 py-1 bg-amber-100 rounded-full">
                                🎯 {q.experience} yrs
                            </span>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <p className="text-gray-500 text-center py-6">
                        No questions found.
                    </p>
                )}
            </div>
        </div>
    );
}

export default DashBoard;
