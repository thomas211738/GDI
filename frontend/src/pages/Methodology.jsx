import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Methodology() {
    const cardClass =
        "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8 h-full";

    const sectionTitle =
        "text-2xl font-bold text-gray-900 dark:text-gray-100";

    const cardTitle =
        "text-xl font-semibold text-gray-900 dark:text-gray-100";

    const bodyText =
        "text-gray-700 dark:text-gray-300";

    const mutedText =
        "text-sm text-gray-600 dark:text-gray-400";

    const insightBadge =
            "inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-full";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans">
            <div className="flex-grow p-4 sm:p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    <Header />

                    <main className="space-y-6">
                        {/* Page Title */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
                                Methodology
                            </h1>
                        </div>

                        {/* Overview */}
                        <div className={cardClass}>
                            <h2 className={cardTitle + " mb-4"}>Overview</h2>
                            <p className={bodyText + " leading-relaxed"}>
                                Get live crowd traffic at Fitrec and view predicted traffic up to
                                three months ahead. By analyzing historical swipe-in logs and
                                simulating user behavior, the system forecasts crowd levels for
                                the entire 2026 calendar year. It accounts for semester
                                schedules, holidays, and daily peak shifts to address
                                inefficient workout planning.
                            </p>
                        </div>

                        {/* Inspiration */}
                        <div className={cardClass}>
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-4">
                                    <h2 className={sectionTitle}>Inspiration</h2>
                                        <ul className={`${bodyText} list-decimal pl-5 space-y-2`}>
                                        <li>
                                                BU’s gym traffic is highly variable and difficult to predict. Students often
                                                encounter long wait times, gym anxiety, or wasted trips.
                                        </li>
                                        <li>
                                                <a
                                                href="https://www.bu.edu/fitrec/peak-quiet-hours/"
                                                className="text-blue-600 dark:text-blue-400 underline"
                                                >
                                                Existing tools
                                                </a>{" "}
                                                on the FitRec website lack granularity and are often difficult to interpret.
                                        </li>
                                        </ul>

                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                                        <img
                                            src="/ReadMe_Pics/Existing%20Tools%20Pic.png"
                                            alt="FitRec Peak Hours Chart"
                                            className="rounded-lg max-h-64 object-contain"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 italic mt-3">
                                        Current “Peak-Quiet Hours” visualization
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Solution */}
                        <div className={cardClass}>
                            <h2 className={sectionTitle + " mb-2"}>The Solution</h2>
                            <p className={bodyText + " mb-6"}>
                                A model trained on raw Fitrec swipe-in data to predict traffic
                                based on context, not averages.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    {
                                        title: "Behavioral Simulation",
                                        desc: "Monte Carlo simulation estimates swipe-out times using a statistical distribution of workout durations.",
                                    },
                                    {
                                        title: "Context-Aware Modeling",
                                        desc: "A Random Forest Regressor learns non-linear relationships between time, date, and crowd density.",
                                    },
                                    {
                                        title: "Schedule Logic",
                                        desc: "Academic calendar parsing automatically adjusts predictions for holidays, intersessions, and closures.",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-50 dark:bg-gray-950 p-5 rounded-xl border border-gray-200 dark:border-gray-800"
                                    >
                                        <h4 className={cardTitle + " mb-2"}>{item.title}</h4>
                                        <p className={mutedText}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Insights */}
                        <div className={cardClass}>
                            <h2 className={sectionTitle + " mb-8 border-b pb-4"}>
                                Main Data Insights
                            </h2>

                            <div className="space-y-16">
                                {/* Insight 1 */}
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="md:w-1/2 flex justify-center bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border">
                                        <img
                                            src="/ReadMe_Pics/Hours%20Trend.png"
                                            alt="Daily Trend"
                                            className="rounded-lg max-h-60 object-contain"
                                        />
                                    </div>

                                    <div className="md:w-1/2">
                                        <span className={insightBadge}>Insight 1</span>
                                        <h3 className={cardTitle + " mb-3"}>
                                            Hourly Patterns
                                        </h3>
                                        <p className={bodyText + " mb-4"}>
                                            Gym traffic follows a predictable distribution with two
                                            major spikes.
                                        </p>
                                        <ul className={mutedText + " space-y-2"}>
                                            <li>
                                                <strong>Morning (7–9 AM):</strong> Sharp increase before
                                                class/work
                                            </li>
                                            <li>
                                                <strong>Midday (12–2 PM):</strong> A moderate dip in
                                                traffic
                                            </li>
                                            <li>
                                                <strong>After Class (5–7 PM):</strong> The busiest time
                                                of day
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>

                                {/* Insight 2 */}
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="md:w-1/2">
                                        <span className={insightBadge}>Insight 2</span>
                                        <h3 className={cardTitle + " mb-3"}>
                                            Daily Patterns
                                        </h3>
                                        <p className={bodyText + " mb-4"}>
                                            Traffic is highest at the start of the week and steadily
                                            declines.
                                        </p>
                                        <ul className={mutedText + " space-y-2"}>
                                            <li>
                                                <strong>Mon/Tue:</strong> Consistently the busiest days
                                            </li>
                                            <li>
                                                <strong>Fridays:</strong> Quietest weekday
                                            </li>
                                            <li>
                                                <strong>Weekends:</strong> Lowest traffic of the week
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="md:w-1/2 flex justify-center bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border">
                                        <img
                                            src="/ReadMe_Pics/Weeks%20Trend.png"
                                            alt="Weekly Trend"
                                            className="rounded-lg max-h-60 object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Insight 3 */}
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="md:w-1/2 flex justify-center bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border">
                                        <img
                                            src="/ReadMe_Pics/Months%20Trend.png"
                                            alt="Monthly Trend"
                                            className="rounded-lg max-h-60 object-contain"
                                        />
                                    </div>

                                    <div className="md:w-1/2">
                                        <span className={insightBadge}>Insight 3</span>
                                        <h3 className={cardTitle + " mb-3"}>
                                            Monthly Patterns
                                        </h3>
                                        <p className={bodyText + " mb-4"}>
                                            As a university gym, traffic is dictated by the academic
                                            calendar.
                                        </p>
                                        <ul className={mutedText + " space-y-2"}>
                                            <li>
                                                <strong>Jan–Feb:</strong> Peak season (New Year's
                                                Resolutions)
                                            </li>
                                            <li>
                                                <strong>May–Aug:</strong> Massive drop-off during Summer
                                            </li>
                                            <li>
                                                <strong>September:</strong> Sharp resurgence for Fall
                                                semester
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Performance + Roadmap */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className={cardClass}>
                                <h2 className={sectionTitle + " mb-4"}>Model Performance</h2>
                                <p className={bodyText + " mb-6"}>
                                    The model generates a{" "}
                                    <strong className="text-gray-900 dark:text-white">
                                        365-day smart calendar
                                    </strong>{" "}
                                    for gym-goers.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { value: "66", label: "RMSE (±66 People)" },
                                        { value: "0.69", label: "R² (~70% Variance)" },
                                    ].map((m, i) => (
                                        <div
                                            key={i}
                                            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-700"
                                        >
                                            <span className="block text-3xl font-bold text-gray-900 dark:text-white">
                                                {m.value}
                                            </span>
                                            <span className="text-xs uppercase tracking-wide font-semibold text-gray-600 dark:text-gray-400">
                                                {m.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={cardClass}>
                                <h2 className={sectionTitle + " mb-4"}>Future Improvements</h2>
                                <ul className="space-y-6 mt-6">
                                    {[
                                        "Weather Integration (Correlate rain/snow with usage)",
                                        "Real-Time Adjustment (Feedback loop via live data)",
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold border border-gray-200 dark:border-gray-700">
                                                {i + 1}
                                            </span>
                                            <span className={bodyText}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}