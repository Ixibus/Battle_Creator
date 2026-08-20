import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react'; // 1. Ajout de cleanup
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

import OnboardingMandatoryMissions from './pages/OnboardingMandatoryMissions/OnboardingMandatoryMissions';
import { useStepStore } from './store/useStepStore';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

vi.mock('./store/useStepStore', () => ({
  useStepStore: vi.fn(),
}));

describe('OnboardingMandatoryMissions', () => {
  const mockSetActiveStep = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useStepStore).mockImplementation((selector: any) =>
      selector({ setActiveStep: mockSetActiveStep })
    );
  });

  // 2. Nettoyage du DOM après chaque test
  afterEach(() => {
    cleanup();
  });

  it("devrait mettre à jour l'étape active à 3 au montage", () => {
    renderWithRouter(<OnboardingMandatoryMissions />);
    
    expect(mockSetActiveStep).toHaveBeenCalledWith(3);
    expect(mockSetActiveStep).toHaveBeenCalledTimes(1);
  });

  it('devrait afficher le titre et le texte descriptif', () => {
    renderWithRouter(<OnboardingMandatoryMissions />);

    const title = screen.getByRole('heading', { level: 1, name: 'Missions Obligatoires' });
    expect(title).toBeInTheDocument();

    expect(screen.getByText('ESPACE')).toBeInTheDocument();
    expect(screen.getByText('GESTION MC')).toBeInTheDocument();
  });

  it('devrait rendre le bouton "Suivant"', () => {
    const { container } = renderWithRouter(<OnboardingMandatoryMissions />);

    const nextBtn = container.querySelector('#onboardingMandatoryMissionsNextBtnId');

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).toHaveTextContent('Suivant');
    expect(nextBtn).toHaveClass('onboardingMandatoryMissionsNextBtn');
  });
});