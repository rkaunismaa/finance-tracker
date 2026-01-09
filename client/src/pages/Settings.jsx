import { Header } from '../components/layout/index.js';
import { Card } from '../components/common/index.js';

function Settings() {
  return (
    <div>
      <Header
        title="Settings"
        subtitle="Manage your application preferences"
      />

      <Card>
        <Card.Header>
          <Card.Title>Application Settings</Card.Title>
          <Card.Description>
            Settings and preferences will be available here in a future update.
          </Card.Description>
        </Card.Header>
        <div className="text-center py-8 text-gray-500">
          <p>Coming soon...</p>
        </div>
      </Card>
    </div>
  );
}

export default Settings;
