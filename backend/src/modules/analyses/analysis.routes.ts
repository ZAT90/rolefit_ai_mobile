import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  createJobAnalysis,
  getJobAnalyses,
  getJobAnalysesMissingSkills,
  getJobAnalysisById,
  patchJobAnalysisStatus,
  removeJobAnalysis,
} from "./analysis.controller.js";
import {
  analysisIdSchema,
  createAnalysisSchema,
  updateAnalysisStatusSchema,
} from "./analysis.validation.js";

export const analysisRoutes = Router();

analysisRoutes.use(authMiddleware);
analysisRoutes.post(
  "/",
  validateRequest(createAnalysisSchema),
  createJobAnalysis,
);
analysisRoutes.get("/", getJobAnalyses);
analysisRoutes.get("/missingskills", getJobAnalysesMissingSkills);
analysisRoutes.get(
  "/:id",
  validateRequest(analysisIdSchema),
  getJobAnalysisById,
);
analysisRoutes.delete(
  "/:id",
  validateRequest(analysisIdSchema),
  removeJobAnalysis,
);
analysisRoutes.patch(
  "/:id/status",
  validateRequest(updateAnalysisStatusSchema),
  patchJobAnalysisStatus,
);
