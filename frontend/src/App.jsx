import axios from "axios";
import { useState } from 'react'
import './App.css'


function App() {
  const [formData, setFormData] = useState({
  cycle: 100,
  op_setting_1: -0.0007,
  op_setting_2: -0.0004,

  sensor_2: 642.15,
  sensor_3: 1589.70,
  sensor_4: 1400.60,
  sensor_6: 21.61,
  sensor_7: 554.36,
  sensor_8: 2388.06,
  sensor_9: 9046.19,
  sensor_11: 47.47,
  sensor_12: 521.66,
  sensor_13: 2388.02,
  sensor_14: 8138.62,
  sensor_15: 8.4195,
  sensor_17: 392,
  sensor_20: 39.06,
  sensor_21: 23.419
})
const [prediction, setPrediction] = useState(null);
const sensors = [
  'sensor_2',
  'sensor_3',
  'sensor_4',
  'sensor_6',
  'sensor_7',
  'sensor_8',
  'sensor_9',
  'sensor_11',
  'sensor_12',
  'sensor_13',
  'sensor_14',
  'sensor_15',
  'sensor_17',
  'sensor_20',
  'sensor_21'
]

const demoPresets = {
  low: {
    cycle: 1,
    op_setting_1: -0.0007,
    op_setting_2: -0.0004,
    sensor_2: 641.82,
    sensor_3: 1589.70,
    sensor_4: 1400.60,
    sensor_6: 21.61,
    sensor_7: 554.36,
    sensor_8: 2388.06,
    sensor_9: 9046.19,
    sensor_11: 47.47,
    sensor_12: 521.66,
    sensor_13: 2388.02,
    sensor_14: 8138.62,
    sensor_15: 8.4195,
    sensor_17: 392,
    sensor_20: 39.06,
    sensor_21: 23.419
  },

  medium: {
    cycle: 145,
    op_setting_1: -0.0004,
    op_setting_2: -0.0001,
    sensor_2: 642.95,
    sensor_3: 1594.92,
    sensor_4: 1409.63,
    sensor_6: 21.61,
    sensor_7: 553.03,
    sensor_8: 2388.13,
    sensor_9: 9046.92,
    sensor_11: 47.54,
    sensor_12: 521.13,
    sensor_13: 2388.15,
    sensor_14: 8130.91,
    sensor_15: 8.4644,
    sensor_17: 395,
    sensor_20: 38.67,
    sensor_21: 23.149
  },

  high: {
    cycle: 163,
    op_setting_1: 0.0003,
    op_setting_2: -0.0004,
    sensor_2: 642.85,
    sensor_3: 1600.54,
    sensor_4: 1421.09,
    sensor_6: 21.61,
    sensor_7: 552.41,
    sensor_8: 2388.20,
    sensor_9: 9049.24,
    sensor_11: 47.89,
    sensor_12: 520.30,
    sensor_13: 2388.20,
    sensor_14: 8124.06,
    sensor_15: 8.5129,
    sensor_17: 393,
    sensor_20: 38.65,
    sensor_21: 23.1419
  }
};

const loadPreset = (risk) => {
  setFormData(demoPresets[risk]);
  setPrediction(null);
};

const handleChange = (event) => {
  const { name, value } = event.target

  setFormData({
    ...formData,
    [name]: Number(value)
  })
}
const runPrediction = async () => {
  console.log("Button clicked!");

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      formData
    );

    console.log(response.data);
    setPrediction(response.data);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="app">

      <header className="topbar">
        <div>
          <h1>AEROPREDICT-AI</h1>
          <p>Aircraft Engine Predictive Maintenance System</p>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </header>


      <main className="dashboard">

        <section className="hero-panel">

  <div className="aircraft-card">

    <div className="panel-label">
      AIRCRAFT DIGITAL TWIN
    </div>

    <div className="aircraft-area">

      <div className="aircraft-container">

    <div className="scanner-box">

        <img
  src="/aircraft.svg"
  className={`aircraft-svg ${
    prediction ? prediction.risk.toLowerCase() : "idle"
  }`}
  alt="Aircraft"
/>

        

    </div>

    <div className="engine-info">
        
    </div>
</div>
</div>

  </div>


<div className="panel">
  <div className="panel-label">
    ENGINE HEALTH
  </div>

  <h1>
    {prediction
      ? Math.round(prediction.predicted_rul)
      : "--"}
  </h1>

  <p>CYCLES REMAINING</p>

  <div
    className={`status ${
      prediction?.risk?.toLowerCase()
    }`}
  >
    {prediction
      ? prediction.risk
      : "SYSTEM READY"}
  </div>

  <p>
    {prediction
      ? prediction.recommendation
      : "Awaiting analysis"}
  </p>

</div>

</section>


        <section className="bottom-grid">

          <div className="panel">
            <div className="panel-label">ENGINE TELEMETRY</div>

            <h2>Engine Input</h2>

            <p className="muted">
              Configure flight and sensor parameters for analysis.
            </p>
            <div className="telemetry-layout">

  {/* LEFT SIDE */}
  <div className="engine-input-layout">

    {/* FLIGHT PARAMETERS */}
    <div className="flight-section">

      <div className="section-title">
        ✈ Flight Parameters
      </div>

      <div className="input-grid">

        <div className="input-group">
          <label>Cycle</label>
          <input
            type="number"
            name="cycle"
            value={formData.cycle}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>OP1</label>
          <input
            type="number"
            step="any"
            name="op_setting_1"
            value={formData.op_setting_1}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>OP2</label>
          <input
            type="number"
            step="any"
            name="op_setting_2"
            value={formData.op_setting_2}
            onChange={handleChange}
          />
        </div>

      </div>
    </div>


    {/* SENSOR PARAMETERS */}
    <div className="sensor-section">

      <div className="section-title">
        📡 Input Parameters
      </div>

      <div className="sensor-grid">

        {sensors.map((sensor) => (
          <div className="sensor-card" key={sensor}>

            <label>
              {sensor.replace("sensor_", "S")}
            </label>

            <input
              type="number"
              step="any"
              name={sensor}
              value={formData[sensor]}
              onChange={handleChange}
            />

          </div>
        ))}

      </div>
    </div>

  </div>


  {/* RIGHT SIDE — DEMO SCENARIOS */}
  <div className="preset-section">

    <span className="preset-label">
      DEMO SCENARIOS
    </span>

    <div className="preset-buttons">

      <button
        type="button"
        className="preset-btn low"
        onClick={() => loadPreset("low")}
      >
        HEALTHY
      </button>

      <button
        type="button"
        className="preset-btn medium"
        onClick={() => loadPreset("medium")}
      >
        WARNING
      </button>

      <button
        type="button"
        className="preset-btn high"
        onClick={() => loadPreset("high")}
      >
        CRITICAL
      </button>

    </div>

  </div>

</div>


{/* DIAGNOSTIC BUTTON */}
<button
  className="diagnostic-button"
  onClick={runPrediction}
>
  🚀 RUN ENGINE DIAGNOSTIC
</button>

</div>

</section>

</main>

</div>
  )
}

export default App