import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { PrivateHeader } from '../PrivateHeader';
import { useAuth } from '@/hooks/useAuth';

// Mock the dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/components/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">LanguageSwitcher</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('PrivateHeader', () => {
  const mockSignOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    vi.mocked(useAuth).mockReturnValue({
      signOut: mockSignOut,
      profile: {
        company_name: 'Test Company AB',
      },
    } as any);

    vi.mocked(useLocation).mockReturnValue({
      pathname: '/medlem',
    } as any);
  });

  const renderComponent = (initialRoute = '/medlem') => {
    vi.mocked(useLocation).mockReturnValue({ pathname: initialRoute } as any);
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <PrivateHeader />
      </MemoryRouter>
    );
  };

  it('renders the logo and company name', () => {
    renderComponent();
    expect(screen.getByText('SOFF')).toBeInTheDocument();
    expect(screen.getAllByText('Test Company AB').length).toBeGreaterThan(0);
  });

  it('renders desktop navigation links', () => {
    renderComponent();
    // Desktop navigation is visible (we can query by role or just text, but text might exist twice for mobile)
    // We'll use getByText and assume the first ones are desktop since they render first in DOM
    const dashboardLinks = screen.getAllByText('dashboard');
    expect(dashboardLinks.length).toBeGreaterThan(0);

    const profileLinks = screen.getAllByText('minProfil');
    expect(profileLinks.length).toBeGreaterThan(0);

    const startPageLinks = screen.getAllByText('gaTillStartsidan');
    expect(startPageLinks.length).toBeGreaterThan(0);
  });

  it('highlights the active link', () => {
    renderComponent('/medlem/profil');

    const profileLinks = screen.getAllByText('minProfil');
    // The active link should have the 'text-gold' class
    expect(profileLinks[0].closest('a')).toHaveClass('text-gold');

    const dashboardLinks = screen.getAllByText('dashboard');
    // The inactive link should not have the 'text-gold' class
    expect(dashboardLinks[0].closest('a')).not.toHaveClass('text-gold');
  });

  it('calls signOut when logout button is clicked', () => {
    renderComponent();

    // There might be two logout buttons (desktop and mobile)
    const logoutButtons = screen.getAllByText('loggaUt');
    fireEvent.click(logoutButtons[0]); // Click desktop logout

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile menu', () => {
    renderComponent();

    const toggleButton = screen.getByLabelText('Toggle menu');

    // Initially closed (max-h-0)
    // Find the mobile menu container by its nav element
    const mobileNav = screen.getAllByRole('navigation')[1];
    const mobileMenu = mobileNav.parentElement;

    expect(mobileMenu).toHaveClass('max-h-0');

    // Click to open
    fireEvent.click(toggleButton);
    expect(mobileMenu).toHaveClass('max-h-64');

    // Click a link inside mobile menu to close it
    const mobileDashboardLink = screen.getAllByText('dashboard')[1];
    fireEvent.click(mobileDashboardLink);
    expect(mobileMenu).toHaveClass('max-h-0');
  });

  it('does not render company name if profile has no company name', () => {
    vi.mocked(useAuth).mockReturnValue({
      signOut: mockSignOut,
      profile: null,
    } as any);

    renderComponent();
    expect(screen.queryByText('Test Company AB')).not.toBeInTheDocument();
  });
});
