import type {AuthenticatedRequest} from '../../middleware/authMiddleware.js';
import {asyncHandler} from '../../utils/asyncHandler.js';
import {
  createAnalysis,
  deleteAnalysis,
  getAnalysis,
  listAnalyses,
  updateAnalysisStatus,
} from './analysis.service.js';

export const createJobAnalysis = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const analysis = await createAnalysis(authReq.user.userId, req.body);
  res.status(201).json({analysis});
});

export const getJobAnalyses = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const analyses = await listAnalyses(authReq.user.userId);
  res.json({analyses});
});

export const getJobAnalysisById = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const analysis = await getAnalysis(authReq.user.userId, String(req.params.id));
  res.json({analysis});
});

export const removeJobAnalysis = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  await deleteAnalysis(authReq.user.userId, String(req.params.id));
  res.status(204).send();
});

export const patchJobAnalysisStatus = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const analysis = await updateAnalysisStatus(
    authReq.user.userId,
    String(req.params.id),
    req.body.status,
  );
  res.json({analysis});
});
