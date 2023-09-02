import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Shows = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="empty"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -1000, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Series
      </motion.div>
    </AnimatePresence>
  );
};

export default Shows;
