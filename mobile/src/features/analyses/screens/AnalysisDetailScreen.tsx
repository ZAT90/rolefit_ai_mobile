import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { AppStackParamList } from '../../../app/navigation/navigation.types';
import { SCREEN_NAMES } from '../../../app/navigation/screenNames';
import { ChipInput } from '../../../shared/components/ChipInput';
import { FullScreenLoadingModal } from '../../../shared/components/FullScreenLoadingModal';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage';
import { useAppDispatch } from '../../../store/hooks';
import { AnalysisStatusBadge } from '../components/AnalysisStatusBadge';
import { AnalysisStatusModal } from '../components/AnalysisStatusModal';
import {
  useGetAnalysisByIdQuery,
  useUpdateAnalysisStatusMutation,
} from '../services/analysesApi';
import { updateAnalysisStatusInList } from '../store/analysesSlice';
import type { AnalysisStatus, JobAnalysis } from '../types/analysis.types';
import { analysisDetailStyles as styles } from './styles/analysisDetailStyles';

type Props = NativeStackScreenProps<
  AppStackParamList,
  typeof SCREEN_NAMES.ANALYSIS_DETAIL
>;

type DetailStatProps = {
  label: string;
  value?: string | number | null;
};

type TextSectionProps = {
  label: string;
  value?: string | null;
  copiedSection?: string | null;
  isCopyEnabled?: boolean;
  variant?: 'default' | 'message' | 'metadata';
  onCopy?: (label: string, value?: string | null) => void;
};

type ReadOnlyChipSectionProps = {
  label: string;
  values?: string[] | null;
};

type ListSectionProps = {
  label: string;
  items?: string[] | null;
  variant: 'numbered' | 'checklist';
};

const fallbackText = 'Not available yet.';

const getSafeArray = (value?: string[] | null) => {
  return Array.isArray(value) ? value : [];
};

const formatDate = (value?: string | null) => {
  if (!value) {
    return fallbackText;
  }

  return new Date(value).toLocaleDateString();
};

const DetailStat = ({ label, value }: DetailStatProps) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text numberOfLines={2} style={styles.statValue}>
        {value ?? fallbackText}
      </Text>
    </View>
  );
};

const TextSection = ({
  label,
  value,
  copiedSection,
  isCopyEnabled,
  variant = 'default',
  onCopy,
}: TextSectionProps) => {
  const hasCopyValue = Boolean(value?.trim());

  return (
    <View
      style={[
        styles.sectionCard,
        variant === 'message' && styles.messageCard,
        variant === 'metadata' && styles.metadataCard,
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>{label}</Text>
        {isCopyEnabled ? (
          <Pressable
            disabled={!hasCopyValue}
            hitSlop={8}
            onPress={() => onCopy?.(label, value)}
            style={({ pressed }) => [
              styles.copyButton,
              pressed && styles.copyButtonPressed,
              !hasCopyValue && styles.copyButtonDisabled,
            ]}
          >
            <Text style={styles.copyButtonText}>
              {copiedSection === label ? 'Copied' : 'Copy'}
            </Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.sectionText}>{value?.trim() || fallbackText}</Text>
    </View>
  );
};

const ReadOnlyChipSection = ({ label, values }: ReadOnlyChipSectionProps) => {
  return (
    <ChipInput
      emptyMessage={fallbackText}
      initialValue={getSafeArray(values)}
      isInactive
      label={label}
      showRequirement={false}
    />
  );
};

const ListSection = ({ label, items, variant }: ListSectionProps) => {
  const safeItems = getSafeArray(items);

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionLabel}>{label}</Text>
      {safeItems.length > 0 ? (
        <View style={styles.listContent}>
          {safeItems.map((item, index) => (
            <View key={`${item}-${index}`} style={styles.listItemCard}>
              <View
                style={[
                  styles.listMarker,
                  variant === 'checklist' && styles.checklistMarker,
                ]}
              >
                <Text style={styles.listMarkerText}>
                  {variant === 'numbered' ? index + 1 : '✓'}
                </Text>
              </View>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.sectionText}>{fallbackText}</Text>
      )}
    </View>
  );
};

const renderAnalysisContent = ({
  analysis,
  copiedSection,
  currentStatus,
  onCopy,
  onOpenStatusModal,
}: {
  analysis: JobAnalysis;
  copiedSection: string | null;
  currentStatus: AnalysisStatus;
  onCopy: TextSectionProps['onCopy'];
  onOpenStatusModal: () => void;
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>RoleFit AI</Text>
        <Text style={styles.title}>{analysis.jobTitle || fallbackText}</Text>
        <Text style={styles.subtitle}>
          {analysis.companyName || 'Company not provided'}
        </Text>
      </View>

      <View style={styles.scoreCard}>
        <View>
          <Text style={styles.scoreLabel}>Fit Score</Text>
          <Text style={styles.scoreValue}>{analysis.fitScore ?? '--'}</Text>
        </View>
        <AnalysisStatusBadge
          onPress={onOpenStatusModal}
          status={currentStatus}
          variant="large"
        />
      </View>

      <View style={styles.statGrid}>
        <DetailStat label="Seniority" value={analysis.seniorityLevel} />
        <DetailStat label="Created" value={formatDate(analysis.createdAt)} />
      </View>

      <TextSection label="Role Summary" value={analysis.roleSummary} />
      <TextSection label="Resume Positioning" value={analysis.resumeAdvice} />
      <TextSection
        copiedSection={copiedSection}
        isCopyEnabled
        label="Outreach Message"
        onCopy={onCopy}
        value={analysis.outreachMessage}
        variant="message"
      />

      <ReadOnlyChipSection
        label="Required Skills"
        values={analysis.requiredSkills}
      />
      <ReadOnlyChipSection
        label="Matched Skills"
        values={analysis.matchedSkills}
      />
      <ReadOnlyChipSection
        label="Missing Skills"
        values={analysis.missingSkills}
      />
      <ReadOnlyChipSection
        label="Seniority Signals"
        values={analysis.senioritySignals}
      />
      <ListSection
        label="Interview Questions"
        items={analysis.interviewQuestions}
        variant="numbered"
      />
      <ListSection
        label="Next Actions"
        items={analysis.nextActions}
        variant="checklist"
      />

      <TextSection
        copiedSection={copiedSection}
        isCopyEnabled
        label="Job URL"
        onCopy={onCopy}
        value={analysis.jobUrl}
        variant="metadata"
      />
      <TextSection
        copiedSection={copiedSection}
        isCopyEnabled
        label="Original Job Description"
        onCopy={onCopy}
        value={analysis.jobDescription}
        variant="metadata"
      />
    </>
  );
};

export const AnalysisDetailScreen = ({ route }: Props) => {
  const { analysisId } = route.params;
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetAnalysisByIdQuery(analysisId);
  const [updateAnalysisStatus, { isLoading: isUpdatingStatus }] =
    useUpdateAnalysisStatusMutation();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<AnalysisStatus | null>(
    null,
  );
  const [statusErrorMessage, setStatusErrorMessage] = useState('');
  const analysis = data?.analysis;

  const handleCopy = (label: string, value?: string | null) => {
    const copyValue = value?.trim();

    if (!copyValue) {
      return;
    }

    Clipboard.setString(copyValue);
    setCopiedSection(label);
  };

  useEffect(() => {
    if (!copiedSection) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setCopiedSection(null);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [copiedSection]);

  useEffect(() => {
    if (analysis?.status) {
      setCurrentStatus(analysis.status);
    }
  }, [analysis?.status]);

  const handleOpenStatusModal = () => {
    setStatusErrorMessage('');
    setIsStatusModalVisible(true);
  };

  const handleCloseStatusModal = () => {
    if (isUpdatingStatus) {
      return;
    }

    setIsStatusModalVisible(false);
  };

  const handleSelectStatus = async (status: AnalysisStatus) => {
    if (!analysis || currentStatus === status) {
      setIsStatusModalVisible(false);
      return;
    }

    setStatusErrorMessage('');

    try {
      const response = await updateAnalysisStatus({
        analysisId: analysis.id,
        status,
      }).unwrap();

      setCurrentStatus(response.analysis.status);
      dispatch(
        updateAnalysisStatusInList({
          id: response.analysis.id,
          status: response.analysis.status,
        }),
      );
      setIsStatusModalVisible(false);
    } catch (statusError) {
      setStatusErrorMessage(getApiErrorMessage(statusError));
    }
  };

  return (
    <ScreenWrapper title="Analysis Detail">
      <FullScreenLoadingModal
        message="Pulling the saved role intelligence from the backend."
        title="Loading analysis"
        visible={isLoading}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {error ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Could not load analysis</Text>
            <Text style={styles.stateText}>{getApiErrorMessage(error)}</Text>
          </View>
        ) : null}

        {!isLoading && !error && analysis
          ? renderAnalysisContent({
              analysis,
              copiedSection,
              currentStatus: currentStatus ?? analysis.status,
              onCopy: handleCopy,
              onOpenStatusModal: handleOpenStatusModal,
            })
          : null}

        {statusErrorMessage ? (
          <View style={styles.statusErrorCard}>
            <Text style={styles.statusErrorText}>{statusErrorMessage}</Text>
          </View>
        ) : null}

        {!isLoading && !error && !analysis ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Analysis not found</Text>
            <Text style={styles.stateText}>
              No saved analysis was returned for this ID: {analysisId}
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <AnalysisStatusModal
        currentStatus={currentStatus ?? analysis?.status}
        isUpdating={isUpdatingStatus}
        onClose={handleCloseStatusModal}
        onSelectStatus={handleSelectStatus}
        visible={isStatusModalVisible}
      />
    </ScreenWrapper>
  );
};
