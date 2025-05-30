import React, { useState } from 'react';
import Stepper, { Step } from '../Animation/Stepper';
import { motion } from "framer-motion";
export default function Steps() {
  const [name, setName] = useState("");

  return (
    <>
      <section className="py-20 px-6  "
       style={{
        backgroundImage: "url('https://img.freepik.com/free-vector/realistic-white-golden-geometric-background_79603-2032.jpg?t=st=1746861373~exp=1746864973~hmac=c1b81fb9ec2e302e5ab81c511f1d1594a78adc1eab460db2aac5f4fa4324e529&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
       <div className="max-w-7xl mx-auto text-center  mb-16 px-4">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900 inline-block relative pb-2"
        >
        Roof Measurements in 3 Easy Steps
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-red via-red-500 to-red-600 rounded-full"
            style={{ originX: 0 }}
          />
        </motion.h3>
      </div>

      <div className="max-w-2xl mx-auto  p-6 rounded-xl ">
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-blue-600">Welcome to the React Bits stepper!</h2>
              <p className="mt-2 text-gray-600">Check out the next step!</p>
            </div>
          </Step>

          <Step>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-600">Step 2</h2>
              <img
                className="h-40 w-full object-cover object-[center_-70px] rounded-lg mt-4"
                src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
                alt="Funny Cat"
              />
              <p className="mt-2 text-gray-600">Custom step content!</p>
            </div>
          </Step>

          <Step>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-purple-600">How about an input?</h2>
              <input
                className="mt-4 px-4 py-2 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name?"
              />
            </div>
          </Step>

          <Step>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-red-600">Final Step</h2>
              <p className="mt-2 text-gray-600">You made it!</p>
            </div>
          </Step>
        </Stepper>
      </div>
      </section>
    </>
  );
}
