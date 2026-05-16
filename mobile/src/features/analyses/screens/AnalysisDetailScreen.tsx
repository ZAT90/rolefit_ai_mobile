import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { AppStackParamList } from '../../../app/navigation/navigation.types';
import { SCREEN_NAMES } from '../../../app/navigation/screenNames';
import { ChipInput } from '../../../shared/components/ChipInput';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage';
import { useGetAnalysisByIdQuery } from '../services/analysesApi';
import type { JobAnalysis } from '../types/analysis.types';
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
  onCopy?: (label: string, value?: string | null) => void;
};

type ReadOnlyChipSectionProps = {
  label: string;
  values?: string[] | null;
};

const fallbackText = 'Not available yet.';

const getSafeArray = (value?: string[] | null) => {
  return Array.isArray(value) ? value : [];
};

const formatStatus = (status?: string | null) => {
  return status ? status.replace('_', ' ') : fallbackText;
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
  onCopy,
}: TextSectionProps) => {
  const hasCopyValue = Boolean(value?.trim());

  return (
    <View style={styles.sectionCard}>
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

const renderAnalysisContent = ({
  analysis,
  copiedSection,
  onCopy,
}: {
  analysis: JobAnalysis;
  copiedSection: string | null;
  onCopy: TextSectionProps['onCopy'];
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
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{formatStatus(analysis.status)}</Text>
        </View>
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
      <ReadOnlyChipSection
        label="Interview Questions"
        values={analysis.interviewQuestions}
      />
      <ReadOnlyChipSection label="Next Actions" values={analysis.nextActions} />

      <TextSection
        copiedSection={copiedSection}
        isCopyEnabled
        label="Job URL"
        onCopy={onCopy}
        value={analysis.jobUrl}
      />
      <TextSection
        copiedSection={copiedSection}
        isCopyEnabled
        label="Original Job Description"
        onCopy={onCopy}
        value={analysis.jobDescription}
      />
    </>
  );
};

export const AnalysisDetailScreen = ({ route }: Props) => {
  const { analysisId } = route.params;
  const { data, error, isLoading } = useGetAnalysisByIdQuery(analysisId);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
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
    if (!data) {
      return;
    }

    console.log('Analysis detail API result:', data);
  }, [data]);

  useEffect(() => {
    if (!copiedSection) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setCopiedSection(null);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [copiedSection]);

  return (
    <ScreenWrapper title="Analysis Detail">
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Loading analysis</Text>
            <Text style={styles.stateText}>
              Pulling the saved role intelligence from the backend.
            </Text>
          </View>
        ) : null}

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
              onCopy: handleCopy,
            })
          : null}

        {!isLoading && !error && !analysis ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Analysis not found</Text>
            <Text style={styles.stateText}>
              No saved analysis was returned for this ID: {analysisId}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </ScreenWrapper>
  );
};
