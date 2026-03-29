import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Pencil, Building2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) =>
      !searchCompanyByText
        ? true
        : company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">Registered Companies</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            {filterCompany.length} compan{filterCompany.length !== 1 ? 'ies' : 'y'} found
          </p>
        </div>
      </div>

      {filterCompany.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Building2 size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium text-white">No companies found</p>
          <p className="text-xs mt-1">Create a new company to get started</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Logo</TableHead>
              <TableHead className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Name</TableHead>
              <TableHead className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Created</TableHead>
              <TableHead className="text-gray-400 text-xs uppercase tracking-widest font-semibold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany.map((company) => (
              <TableRow key={company._id} className="border-white/5 hover:bg-white/5 transition">

                {/* Logo */}
                <TableCell>
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-purple-300 font-bold text-sm">
                        {company.name?.charAt(0)}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Name */}
                <TableCell className="text-white font-medium text-sm">
                  {company.name}
                </TableCell>

                {/* Date */}
                <TableCell className="text-gray-400 text-sm">
                  {new Date(company.createdAt).toLocaleDateString('en-GB')}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:border-purple-500/40 hover:text-purple-300 transition ml-auto">
                        <MoreHorizontal size={15} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 bg-[#0f0a1e] border border-white/10 rounded-xl shadow-xl">
                      <button
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CompaniesTable;